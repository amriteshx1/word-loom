require('dotenv').config();
const express = require("express");
const path = require("path");
const cors = require('cors');
const routes = require('./routes');
const session = require('express-session');
const passport = require('passport');
require('./config/passport');

const app = express();

app.use(session({ secret: 'random', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// Middlewares
app.use(cors());
app.use(express.json());

// Home Route
app.get('/', (req, res) => {
    res.redirect('/api');
});
app.use('/api', routes);

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
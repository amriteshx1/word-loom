require('dotenv').config();
const express = require("express");
const path = require("path");
const cors = require('cors');
const routes = require('./routes');
const session = require('express-session');
const passport = require('passport');
require('./config/passport');

const app = express();

console.log("USER URL:", process.env.FRONTEND_URL_USER);
console.log("ADMIN URL:", process.env.FRONTEND_URL_ADMIN);

app.use(cors({
  origin: [process.env.FRONTEND_URL_USER, 'https://word-loom-mocha.vercel.app'],
  credentials: true
}));

app.use(session({ secret: 'random', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());

// Home Route
app.get('/', (req, res) => {
    res.redirect('/api');
});
app.use('/api', routes);

// Start Server
const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
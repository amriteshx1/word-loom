require('dotenv').config();
const express = require("express");
const path = require("path");
const cors = require('cors');
const routes = require('./routes');

const app = express();

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
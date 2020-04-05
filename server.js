const express = require('express');
const app = express();
const path = require('path');
const logger = require("morgan");
const mongoose = require("mongoose");

// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");

var db = require("./server/models");

const PORT = process.env.PORT || 5000;

// Use morgan logger for logging requests
app.use(logger("dev"));

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Make public a static folder
app.use(express.static(path.join(__dirname, './client')));

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/toturi_db", { useNewUrlParser: true });

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './client/index.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './client/index.html'));
});

app.listen(PORT, () => console.log(`App Listening on PORT: ${PORT}`))
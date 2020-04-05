const express = require('express');
const app = express();
const path = require('path');
const logger = require('morgan');
const mongoose = require('mongoose');

// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require('axios');
var cheerio = require('cheerio');

var db = require('./server/models');

const PORT = process.env.PORT || 5000;

// Use morgan logger for logging requests
app.use(logger('dev'));

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Make public a static folder
app.use(express.static(path.join(__dirname, './client')));

// Connect to the Mongo DB
mongoose.connect('mongodb://localhost/toturi_db', { useNewUrlParser: true });

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, './client/index.html'));
});

app.post('/user', function (req, res) {
    console.log('Hitting the user route in the server!')
    console.log(req.body)
	// Create a new note and pass the req.body to the entry
	// db.User.create(req.body)
	// 	.then(function (dbUser) {
	// 		// If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
	// 		// { new: true } tells the query that we want it to return the updated User -- it returns the original by default
	// 		// Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
	// 		return db.Article.findOneAndUpdate(
	// 			{ _id: req.params.id },
	// 			{ user_id: dbUser._id },
	// 			{ new: true }
	// 		);
	// 	})
	// 	.catch(function (err) {
	// 		// If an error occurred, send it to the client
	// 		res.json(err);
	// 	});
});

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, './client/index.html'));
});

app.listen(PORT, () => console.log(`App Listening on PORT: ${PORT}`));

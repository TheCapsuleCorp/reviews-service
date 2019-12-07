const express = require('express');
const path = require('path');
const app = express();
const db = require('../database/index.js');

app.use(express.static(__dirname + '/../client'));
app.use('/rooms/:roomid', express.static(__dirname + '/../client'));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/rooms/:roomid/ratings', (req, res) => {
  let returnRatings = (err, ratings) => {
    if (err) {
      console.log('Error retrieving ratings from db: ', err);
      throw err;
    }
    res.status(200).send(ratings);
  };

  db.findRatings(req.params.roomid, returnRatings);
});

app.get('/rooms/:roomid/reviews', (req, res) => {
  let returnReviews = (err, reviews) => {
    if (err) {
      console.log('Error retrieving reviews from db: ', err);
      throw err;
    }
    res.status(200).send(reviews);
  };

  db.findReviews(req.params.roomid, returnReviews);
});

module.exports = app;

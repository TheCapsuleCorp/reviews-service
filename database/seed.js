var mongoose = require('mongoose');
var fs = require('fs');
const testDataRatings = require('./CapBnBTestDataRatings.js');

let mongoUrl = 'mongodb://localhost/hacknb';

mongoose.connect(mongoUrl, {reconnectTries: 25}).catch((err) => {
  console.log('Error connecting to db: ', err);
});

var db = mongoose.connection;
db.catch((err) => {
  console.log('Error connecting to db: ', err);
});
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to database!');

  mongoose.connection.db.dropDatabase();

  var reviewSchema = mongoose.Schema({
    listing_id: Number,
    roomId: Number,
    created_at: String,
    first_name: String,
    picture_url: String,
    comments: String,
    has_profile_pic: Boolean,
    identity_verified: Boolean
  });

  var Review = mongoose.model('Review', reviewSchema);

  fs.readFile(__dirname + '/reviews.json', {
    encoding: 'utf-8'
  }, (err, data) => {
    if (err) {
      console.log('Error reading listings.json: ', err);
      throw err;
    }
    data = JSON.parse(JSON.parse(data));

    let counter = 0;
    for (var key in data) {
      const newRoomId = 11111111 + counter;
      data[newRoomId] = data[key];
      delete data[key];
      data[newRoomId].reviews.forEach((review) => {
        review.first_name = review.author.first_name;
        review.picture_url = review.author.picture_url;
        review.has_profile_pic = review.author.has_profile_pic;
        review.identity_verified = review.author.identity_verified;
        review.roomId = newRoomId;
        delete review.author;
        Review.create(review, (err) => {
          if (err) {
            console.log('Error saving review to db: ', err);
            throw err;
          }
          console.log('Saved review to db: ', review);
        })
      });
      counter++;
    }
  });

  var ratingSchema = mongoose.Schema({
    star_rating: Number,
    review_rating_accuracy: Number,
    review_rating_checkin: Number,
    review_rating_cleanliness: Number,
    review_rating_communication: Number,
    review_rating_location: Number,
    review_rating_value: Number,
    listing_id: Number,
    roomId: Number,
  });

  var Rating = mongoose.model('Rating', ratingSchema);

  testDataRatings.forEach((listing, index) => {
    Rating.create(listing, (err) => {
      if (err) {
        console.log('Error saving rating to db: ', err);
        throw err;
      }
      console.log('Saved rating to db: ', listing);
    });
  });
});

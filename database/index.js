const mongoose = require('mongoose');

let mongoUrl = 'mongodb://localhost/hacknb';

mongoose.connect(mongoUrl, {reconnectTries: 25});

let db = mongoose.connection;

let ratingSchema = mongoose.Schema({
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

let Ratings = mongoose.model('Ratings', ratingSchema);

let findRatings = (id, callback) => {
  Ratings.find({roomId: id})
  .exec(callback);
};

let reviewSchema = mongoose.Schema({
    listing_id: Number,
    roomId: Number,
    created_at: String,
    first_name: String,
    picture_url: String,
    comments: String,
    has_profile_pic: Boolean,
    identity_verified: Boolean
  });

let Reviews = mongoose.model('Reviews', reviewSchema);

let findReviews = (id, callback) => {
  Reviews.find({roomId: id})
  .exec(callback);
}

exports.findRatings = findRatings;
exports.findReviews = findReviews;

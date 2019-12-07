const testData = require('./listings.json');
const parsedData = JSON.parse(testData);

module.exports = parsedData.map((data, i) => {
  const listingTemplate = {
    listing_id: data.listing.listing_id,
    roomId: 11111111 + i,
    star_rating: data.listing.star_rating,
    review_rating_accuracy: data.listing.review_rating_accuracy,
    review_rating_checkin: data.listing.review_rating_checkin,
    review_rating_cleanliness: data.listing.review_rating_cleanliness,
    review_rating_communication: data.listing.review_rating_communication,
    review_rating_location: data.listing.review_rating_location,
    review_rating_value: data.listing.review_rating_value
  };
  return listingTemplate;
});

console.log(module.exports);

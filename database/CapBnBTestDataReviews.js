const testData = require('./reviews.json');
const parsedData = JSON.parse(testData);

console.log(parsedData);

{
"_id": ObjectId("5de9dbdd7c4c160f27fec4ae"),
"comments" : "Stirling and Georgia couldn't be more welcoming with a beer and an invite to watch the big boxing match on TV on arrival! Conveniently located for all main attractions,don't expect modern in the house with many original fixtures but, as an artists place, it is wonderfully Boho. The pool and jacuzzi is perfect to cool off after a hot day exploring. \nThe room is huge with comfy sofa, double bed and one single, plus a dressing area and very large bathroom with shower and separate bath. No aircon or fan but open windows meant it was cool enough. (Bring earplugs if you don't do traffic/ street noise.) Georgia was attentive to all our needs and patient with our many questions plus great stimulating conversation if you wanted, as we did! Thanks for a fabulous introduction to California, we will be back!",
"created_at" : "2017-08-29T17:43:10Z",
"listing_id" : 69838,
"first_name" : "Liz",
"picture_url" : "https://a0.muscache.com/im/pictures/dd904473-52bd-400b-a78b-1f0d4c75f9e4.jpg?aki_policy=profile_x_medium",
"has_profile_pic" : true,
"identity_verified" : true, "__v" : 0
}

{
  '69838': {
    reviews: [
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object]
    ],
    metadata: { reviews_count: 444, should_show_review_translations: false }
  },
  '205043': {
    reviews: [
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object]
    ],
    metadata: { reviews_count: 208, should_show_review_translations: false }
  },
  '269053': {
    reviews: [
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object]
    ],
    metadata: { reviews_count: 90, should_show_review_translations: false }
  },
}

var data = parsedData;
for (var key in data) {
  data[key].reviews.forEach((review, i) => {
    review.first_name = review.author.first_name;
    review.picture_url = review.author.picture_url;
    review.has_profile_pic = review.author.has_profile_pic;
    review.identity_verified = review.author.identity_verified;
    review.roomId =
    Review.create(review, (err) => {
      if (err) {
        console.log('Error saving review to db: ', err);
        throw err;
      }
      console.log('Saved review to db: ', review);
    });
  });

const newData = parsedData.map((data, i) => {
  const listingTemplate = {
    listing_id: data.listing_id,
    roomId: 11111111 + i,
    created_at: data.created_at,
    first_name: data.first_name,
    picture_url: data.picture_url,
    comments: data.comments,
    has_profile_pic: data.has_profile_pic,
    identity_verified: data.identity_verified,
  };
  return listingTemplate;
});

// console.log(newData[0]);

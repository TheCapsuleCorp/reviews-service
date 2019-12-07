import React from 'react';
import jest from 'jest';
import renderer from 'react-test-renderer';
import ReviewList from '../public/components/reviewList.jsx';


test('ReviewList/ReviewListEntry components render based on the passed in reviews array', () => {

  const reviews = [
    {
      comments: "Great place, ideal location.",
      created_at: "2018-02-01T20:36:24Z",
      first_name: "Tyler",
      has_profile_pic: true,
      identity_verified: true,
      listing_id: 21826970,
      month: "February",
      picture_url: "https://a0.muscache.com/im/pictures/0794b769-abf6-4127-ae9f-3c3bf53fa034.jpg?aki_policy=profile_x_medium",
      year: "2018"
    },
    {
      comments: "The apartment is in a great location. A lot of bars and restaurants around that you can walk to.",
      created_at: "2017-12-02T20:11:08Z",
      first_name: "Jackie",
      has_profile_pic: true,
      identity_verified: false,
      listing_id: 21826970,
      month: "December",
      picture_url: "https://a0.muscache.com/im/pictures/45a0be0d-7f73-4046-9d57-134457f2a311.jpg?aki_policy=profile_x_medium",
      year: "2017"
    }
  ];

  const reviewComponents = renderer
    .create(<ReviewList reviews={reviews} />)
    .toJSON();

  expect(reviewComponents).toMatchSnapshot();
});

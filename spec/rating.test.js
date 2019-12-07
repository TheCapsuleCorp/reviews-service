import React from 'react';
import jest from 'jest';
import Enzyme from 'enzyme';
import Rating from '../public/components/rating.jsx';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';

Enzyme.configure({
  adapter: new Adapter()
});

test('Rating component renders state with ratings object fetched from server', () => {

  const rating = {
    'star_rating': 5,
    'review_rating_accuracy': 10,
    'review_rating_checkin': 10,
    'review_rating_cleanliness': 10,
    'review_rating_communication': 10,
    'review_rating_location': 10,
    'review_rating_value': 10,
    'listing_id': 18359884
  };

  let server = sinon.fakeServer.create();
  server.respondWith('GET', '/rooms/18359884/ratings', JSON.stringify(rating));

  const wrapper = Enzyme.shallow(<Rating listing_id='18359884' handleSearch={() => {}} />);
  const instance = wrapper.instance();

  server.respond();
  server.restore();

  expect(instance.state.ratings).toHaveProperty('star_rating');
});

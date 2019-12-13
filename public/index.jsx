import React from 'react';
import ReactDOM from 'react-dom';
import ReviewService from './ReviewService.jsx';

let listingId = window.location.href.split('/')[4];
if (!listingId || listingId.length !== 8) {
  listingId = '11111117';
}

ReactDOM.render(<ReviewService listing_id={listingId} />, document.getElementById('reviews-service'));

export default Reviews;

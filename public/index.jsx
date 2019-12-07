import React from 'react';
import ReactDOM from 'react-dom';
import Rating from './components/rating.jsx';
import ReviewList from './components/reviewList.jsx';
import $ from 'jquery';
import '../client/assets/styles.css';

class ReviewService extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reviews: [],
      filtered: []
    };
    this.term = '';
    this.fetchReviews();
  }

  handleSearch(term) {
    if (term === '') {
      this.term = '';
      this.setState({
        filtered: this.state.reviews
      });
      return;
    }

    this.setState({
      filtered: this.state.reviews.filter((review) => {
        return term.split(' ').length > 1 ? review.comments.toUpperCase().includes(term.toUpperCase())
          : review.comments.toUpperCase().split(' ').includes(term.toUpperCase());
      })
    });
    this.term = term;
  }

  fetchReviews() {
    $.ajax('/rooms/' + this.props.listing_id + '/reviews', {
      method: 'GET',
      dataType: 'json',
      success: (data) => {
        this.setState({
          reviews: data,
          filtered: data
        });
      }
    });
  }

  render() {
    return (
      <div>
        <Rating listing_id={this.props.listing_id} numReviews={this.state.reviews.length}
          numSearch={this.state.filtered.length} handleSearch={this.handleSearch.bind(this)}
          term={this.term} />
        <ReviewList reviews={this.state.filtered} />
      </div>
    );
  }
}

let listingId = window.location.href.split('/')[4];
if (!listingId || listingId.length !== 8) {
  listingId = '11111117';
}

ReactDOM.render(<ReviewService listing_id={listingId} />, document.getElementById('reviews-service'));

export default ReviewService;

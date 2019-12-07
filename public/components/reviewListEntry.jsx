import React from 'react';

class ReviewListEntry extends React.Component {
  constructor(props) {
    super(props);
  }

  parseDate() {
    if (!this.props.review) {
      return;
    }

    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let date = new Date(this.props.review.created_at);

    this.props.review.month = months[date.getMonth()];
    this.props.review.year = date.toDateString().split(' ')[3];
  }

  render() {

    this.parseDate();

    return (
      <div className="reviews-container">
        <div className="reviews-head">
          <img src={this.props.review.picture_url}></img>
          <div className="reviews-head-text">
            <span className="reviews-head-name"> {this.props.review.first_name} </span>
            <span className="reviews-head-date"> {this.props.review.month} {this.props.review.year} </span>
          </div>
        </div>
        <div className="reviews-body">
          {this.props.review.comments}
        </div>
      </div>
    );
  }
}

export default ReviewListEntry;

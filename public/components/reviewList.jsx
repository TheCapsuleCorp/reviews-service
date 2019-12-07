import React from 'react';
import ReviewListEntry from './reviewListEntry.jsx';
import $ from 'jquery';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';

class ReviewList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      curIdx: 0
    };
  }

  handleClick(index, event) {
    if (index === -2) {
      if (this.state.curIdx > 0) {
        let newIndex = this.state.curIdx - 7;
        this.setState({
          curIdx: newIndex
        });
        if (this.selected) {
          this.selected.removeClass('reviews-btn-selected');
        }
        this.selected = $(document).find('.reviews-btn-' + (newIndex / 7 + 1));
        this.selected.addClass('reviews-btn-selected');
      }
    } else if (index === -1) {
      if (this.state.curIdx <= this.props.reviews.length - 7) {
        let newIndex = this.state.curIdx + 7;
        this.setState({
          curIdx: newIndex
        });
        if (this.selected) {
          this.selected.removeClass('reviews-btn-selected');
        } else {
          $(document).find('.reviews-btn-1').removeClass('reviews-btn-selected');
        }
        this.selected = $(document).find('.reviews-btn-' + (newIndex / 7 + 1));
        this.selected.addClass('reviews-btn-selected');
      }
    } else if (index !== this.state.curIdx) {
      this.setState({
        curIdx: (index - 1) * 7
      });
      if (this.selected) {
        this.selected.removeClass('reviews-btn-selected');
      } else {
        $(document).find('.reviews-btn-1').removeClass('reviews-btn-selected');
      }
      this.selected = $(document).find('.reviews-btn-' + index);
      this.selected.addClass('reviews-btn-selected');
    }
  }

  genReviewsNav() {
    if (this.props.reviews.length === 0) {
      return <div></div>;
    }

    let reviewsNav = [];
    let lastPage = Math.ceil(this.props.reviews.length / 7);

    if (this.state.curIdx > 0) {
      reviewsNav.push(<button key={-1} className="reviews-btn reviews-btn-left" onClick={this.handleClick.bind(this, -2)}> <FaChevronLeft /> </button>);
    } else {
      reviewsNav.push(<button key={-1} className="reviews-btn reviews-empty-btn">.</button>);
    }

    reviewsNav.push( <button key={-2} className="reviews-btn reviews-btn-1 reviews-btn-selected" onClick={this.handleClick.bind(this, 1)}>1</button>);
    this.props.reviews.forEach((review, index) => {
      if (index > 0 && index % 7 === 0 && index / 7 + 1 < lastPage) {
        reviewsNav.push(<button key={index * -10} className={'reviews-btn reviews-btn-' + (index / 7 + 1)} onClick={this.handleClick.bind(this, index / 7 + 1)}>{index / 7 + 1}</button>);
      }
    });

    if (lastPage > 1) {
      reviewsNav.push(<button key={this.props.reviews.length * -10} className={'reviews-btn reviews-btn-' + lastPage} onClick={this.handleClick.bind(this, lastPage)}>{lastPage}</button>);
    }
    if (this.state.curIdx / 7 + 1 < lastPage) {
      reviewsNav.push(<button key={this.props.reviews.length * -10 + 1} className="reviews-btn reviews-btn-right" onClick={this.handleClick.bind(this, -1)}> <FaChevronRight /> </button>);
    }
    return reviewsNav;
  }

  render() {
    let reviews = [];
    this.reviewsNav = this.genReviewsNav();
    let propReviews = this.props.reviews.sort((a, b) => {
      let aDate = new Date(a.created_at);
      let bDate = new Date(b.created_at);
      if (aDate.getTime() < bDate.getTime()) {
        return 1;
      } else if ((aDate.getTime()) > bDate.getTime()) {
        return -1;
      } else {
        return 0;
      }
    });

    propReviews.forEach((review, index) => {
      if (index >= this.state.curIdx && index < this.state.curIdx + 7) {
        reviews.push(<ReviewListEntry review={review} key={index} />);
      }
    });

    return (
      <div className="reviews-section">
        {reviews}
        <div className="reviews-nav">
          {this.reviewsNav}
        </div>
      </div>
    );

  }
}

export default ReviewList;

import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
  }

  handleKeyUp(event) {
    this.term = event.target.value;
    if (event.key === 'Enter') {
      this.props.handleSearch(this.term);
      event.target.value = '';
    }
  }

  render() {
    return <input type="text" onKeyUp={this.handleKeyUp.bind(this)} placeholder="Search reviews"></input>;
  }
}

export default Search;
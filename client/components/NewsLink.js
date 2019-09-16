import React, { Component } from 'react';

class NewsLink extends Component {
  componentDidMount() {
    // console.log('NewsLink:::', this.props);
  }

  render() {
    return (
      <div>
        <div>
          {this.props.link.description} ({this.props.link.url})
        </div>
      </div>
    );
  }
}

export default NewsLink;

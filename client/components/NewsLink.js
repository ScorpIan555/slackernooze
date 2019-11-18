import React, { Component } from 'react';

const NewsLink = props => {
  return (
    <div>
      <div>
        {props.link.description} ({props.link.url})
      </div>
    </div>
  );
};

export default NewsLink;

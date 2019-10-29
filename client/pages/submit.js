// pages/createLink.js
import React from 'react';
import CreateLink from '../components/CreateLink';
import { withApollo } from '../lib/apollo';

// @TODO need to refactor this outslackeslackef

const createLinkPage = props => {
  console.log('createLinkPage.props:::', props);
  // console.log('client:::', client);
  return (
    <div>
      <CreateLink />
    </div>
  );
};

export default withApollo(createLinkPage);

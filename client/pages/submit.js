// pages/createLink.js
import React from 'react';
import CreateLink from '../components/CreateLink';

// @TODO need to refactor this outf
// Apollo Client imports
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';

const httpLink = createHttpLink({
  uri: 'http://localhost:4000'
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

const createLinkPage = props => {
  // console.log('IndexPage.props:::', props);
  // console.log('client:::', client);
  return (
    <ApolloProvider client={client}>
      <div>
        <CreateLink />
      </div>
    </ApolloProvider>
  );
};

export default createLinkPage;

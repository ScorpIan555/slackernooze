// pages/createLink.js
import React from 'react';
import CreateLink from '../components/CreateLink';
import Layout from '../components/Layout';

// Apollo Client imports
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import fetch from 'isomorphic-unfetch';

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
      <Layout> 
        <div>
          <CreateLink />
        </div>
      </Layout>
    </ApolloProvider>
  );
};

export default createLinkPage;

// pages/index.js
import React, { Component } from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import LinkList from '../components/LinkList';

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

class IndexPage extends Component {
  render() {
    console.log('IndexPage.props:::', this.props);
    console.log('client:::', client);
    return (
      <ApolloProvider client={client}>
        <Layout>
          <div>
            <LinkList />
          </div>
        </Layout>
      </ApolloProvider>
    );
  }
}

export default IndexPage;

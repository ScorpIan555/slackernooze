// pages/index.js
import React, { Component } from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import LinkList from '../components/LinkList';
import { withApollo } from '../lib/apollo';
import { AuthProvider } from 'react-use-auth';

const IndexPage = props => {
  // console.log('IndexPage.props:::', props);

  return (
    <Layout>
      <div>
        <LinkList />
      </div>
    </Layout>
  );
};
export default withApollo(IndexPage);

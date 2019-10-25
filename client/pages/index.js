// pages/index.js
import React, { Component } from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import LinkList from '../components/LinkList';
import { withApollo } from '../lib/apollo';

const IndexPage = props => {
  // console.log('IndexPage.props:::', props);

  return (
      <LinkList />
  );
};
export default withApollo(IndexPage);

// pages/index.js
import React from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import LinkList from '../components/LinkList';
import { withApollo } from '../lib/apollo';

const IndexPage = () => (
  <Layout>
    <br />
    {/* <Link href="/explore">
      <a> Welcome to Slacker News! Start Exploring Now</a>
    </Link> */}

    {/* <LinkList></LinkList> */}
  </Layout>
);

// export default withApollo(IndexPage);
export default IndexPage;

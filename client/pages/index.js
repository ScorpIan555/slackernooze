// pages/index.js
import React from 'react';
import Link from 'next/link';
import { Layout } from '../components/_index';

const Index = () => (
  <Layout>
    <br />
    <Link href="/explore">
      <a> Welcome to Slacker News! Start Exploring Now</a>
    </Link>
  </Layout>
);

export default Index;

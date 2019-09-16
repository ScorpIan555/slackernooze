// pages/index.js
import React, { Component } from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import LinkList from '../components/LinkList';
import { withApollo } from '../lib/apollo';

const IndexPage = props => {
  console.log('IndexPage.props:::', props);

  return (
    <Layout>
      <div>
        <LinkList />
      </div>
    </Layout>
  );
};
export default withApollo(IndexPage);

// // Apollo Client imports
// import { ApolloProvider } from '@apollo/react-hooks';
// import { ApolloClient } from 'apollo-client';
// import { InMemoryCache } from 'apollo-cache-inmemory';
// import { createHttpLink } from 'apollo-link-http';
// import fetch from 'isomorphic-unfetch';

// const httpLink = createHttpLink({
//   uri: 'http://localhost:4000'
// });

// const client = new ApolloClient({
//   link: httpLink,
//   cache: new InMemoryCache()
// });

// const IndexPage = props => {
//   console.log('IndexPage.props:::', props);

//   return (
//     <ApolloProvider client={client}>
//       <Layout>
//         <div>
//           <LinkList />
//         </div>
//       </Layout>
//     </ApolloProvider>
//   );
// };

// export default IndexPage;

import React from 'react';
import App from 'next/app';
import Router from 'next/router';
import Layout from '../components/Layout';
import { withApollo } from '../lib/apollo';
// import UserContext from '../components/UserContext';
import awsConfig from '../lib/awsAuth';
import Amplify from '@aws-amplify/auth';

Amplify.configure({
  //  // uncomment when client-api troubleshooting is done
  Auth: awsConfig.Auth, // AWS Amplify Cognito authorization module
  Storage: awsConfig.Storage, // AWS Amplify S3 asset storage module
  API: awsConfig.API // AWS Amplify API Gateway api connection module
});

class MyApp extends App {
  render() {
    let localStorage;
    const { Component, pageProps } = this.props;
    console.log('_app.js -- this.props:::', this.props);

    return (
      // <UserContext.Provider
      //   value={{
      //     user: this.state.user,
      //     signIn: this.signIn,
      //     signOut: this.signOut
      //   }}
      // >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    );
  }
}

export default withApollo(MyApp);

import React from 'react';
import App from 'next/app';
import Router from 'next/router';
import Layout from '../components/Layout';
import { withApollo } from '../lib/apollo';
// import UserContext from '../components/UserContext';
import awsConfig from '../lib/awsAuth';
import Amplify from '@aws-amplify/auth';
import Auth from '@aws-amplify/auth';

Amplify.configure({
  //  // uncomment when client-api troubleshooting is done
  Auth: awsConfig.Auth // AWS Amplify Cognito authorization module
});

class MyApp extends App {
  componentDidMount() {
    let fish = Auth.currentCredentials()
      .then(result => {
        console.log('fish:::', result);
      })
      .catch(error => {
        console.log('error:::', error);
      });   

    Auth.currentSession()
      .then(result => {
        console.log('currentSession.result:::', result);
      })
      .catch(error => {
        console.log('error:::', error);
      });

    // return fish;
  }

  callCompletedPromise = () => {
    {
      fish.isFulfilled
        ? console.log('fish:::', fish)
        : console.log('wait_for_it...');
    }
  };

  render() {
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

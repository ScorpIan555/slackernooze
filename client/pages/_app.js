import React from 'react';
import App from 'next/app';
import Layout from '../components/Layout';
import { withApollo } from '../lib/apollo';
import { useAuth, ProvideAuth } from '../lib/stateManagement';
import { AwsAuthConfig, AwsAmplify, AwsAmplifyAuth } from '../lib/awsExports';

AwsAmplify.configure({
  //  // uncomment when client-api troubleshooting is done
  Auth: AwsAuthConfig.Auth // AWS Amplify Cognito authorization module
});

class MyApp extends App {
  componentDidMount() {
    let fish = AwsAmplifyAuth.currentCredentials()
      .then(result => {
        console.log('fish:::', result);
      })
      .catch(error => {
        console.log('error:::', error);
      });

    AwsAmplifyAuth.currentSession()
      .then(result => {
        console.log('currentSession.result:::', result);
      })
      .catch(error => {
        console.log('error:::', error);
      });

    // return fish;
  }


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
      <ProvideAuth>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ProvideAuth>
    );
  }
}

export default withApollo(MyApp);

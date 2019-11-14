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
  state = {
    cachedAuth: {}
  };

  componentDidMount() {
    AwsAmplifyAuth.currentCredentials()
      .then(result => {
        console.log('fish:::', result);
        let cachedResult = result;
        this.setState({
          cachedAuth: cachedResult
        });
        return cachedResult;

        //  cachedResult
      })
      .catch(error => {
        console.log('error:::', error);
      });

    // AwsAmplifyAuth.currentSession()
    //   .then(result => {
    //     console.log('currentSession.result:::', result);
    //   })
    //   .catch(error => {
    //     console.log('error:::', error);
    //   });
  }

  componentDidCatch(error, errorInfo) {
    console.log('Custom error handling!:::', error);
    // This is needed to render errors correctly in dev/prod
    super.componentDidCatch(error, errorInfo);
  }

  componentDidUpdate(prevProps) {
    console.log('prevProps::::', prevProps);
    console.log('this.props:::', this.props);
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

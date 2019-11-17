import React from 'react';
import App from 'next/app';
import Layout from '../components/Layout';
import { withApollo } from '../lib/apollo'; // apollo client wrapper
import { ProvideAuth } from '../lib/stateManagement'; // client-side auth using React.context (+ custom hooks)
import {
  AwsAuthConfig,
  AwsAmplify,
  AwsAmplifyAuth as AuthInstance
} from '../lib/awsExports'; // Aws-amplify api modules

// initialize instance of AWS Amplify Auth module
AwsAmplify.configure({ Auth: AwsAuthConfig.Auth });

// per: https://github.com/zeit/next.js/pull/9268
// this is no longer required to be a class component
class MyApp extends App {
  state = {
    cachedCurrentCreds: {}
  };

  componentDidMount() {
    console.log('process.env.CUSTOM_ENV:::', process.env.CUSTOM_ENV);
    process.env.PORT;
    //
    AuthInstance.currentCredentials()
      .then(result => {
        console.log('fish:::', result);
        let cachedResult = result;
        this.setState({
          cachedCurrentCreds: cachedResult
        });
        return cachedResult;

        //  cachedResult
      })
      .catch(error => {
        console.log('error:::', error);
      });

    AuthInstance.currentSession()
      .then(result => {
        console.log('currentSession.result:::', result);
        let cachedResult = result;
        this.setState({
          cachedCurrentSession: cachedResult
        });
        return cachedResult;
      })
      .catch(error => {
        console.log('error:::', error);
      });

    // console.log('req.headers.host:::', req.headers.host);
  }

  logShit = () => {
    console.log('window.location:::', window);
    console.log('window.location:::', window.location);
    console.log('window.document.localStorage;::', window.localStorage);
    console.log('this.state:::', this.state);
  };

  componentDidCatch(error, errorInfo) {
    console.log('Custom error handling!:::', error);
    // This is needed to render errors correctly in dev/prod
    super.componentDidCatch(error, errorInfo);
  }

  componentDidUpdate(prevProps) {
    // console.log('prevProps::::', prevProps);
    // console.log('this.props:::', this.props);
  }

  render() {
    const { Component, pageProps } = this.props;
    // console.log('_app.js -- this.props:::', this.props);

    return (
      <ProvideAuth>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ProvideAuth>
    );
  }
}

export default withApollo(MyApp);

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
import { useAuth } from '../lib/stateManagement';

// initialize instance of AWS Amplify Auth module
AwsAmplify.configure({ Auth: AwsAuthConfig.Auth });

// const stateUpdater = props => {
//   const auth = useAuth();
//   auth['sessionToken'] = props.token;
//   return;
// };

// per: https://github.com/zeit/next.js/pull/9268
// this is no longer required to be a class component
class MyApp extends App {
  state = {
    currentCredentials: {},
    sessionToken: ''
  };

  static async getInitialProps({ ctx }) {
    console.log('ctx::::', ctx);

    return {
      isServer: ctx.hasOwnProperty('req')
    };
  }

  // callStateUpdateComponent = () => {
  //   stateUpdater(this.state.sessionToken);
  // };

  async componentDidMount() {
    if (!this.props.isServer) {
      console.log('localStorage:::', localStorage);
      console.log('localStorage[auth-token]:::', localStorage['auth-token']);
      this.setState({ sessionToken: localStorage['auth-token'] });
    }
    //
    AuthInstance.currentCredentials()
      .then(result => {
        console.log('fish:::', result);
        let currentCredentials = result;
        this.setState({
          currentCredentials: currentCredentials
        });
        return currentCredentials;
        //  cachedResult
      })
      .catch(error => {
        console.log('error:::', error);
      });

    AuthInstance.currentSession()
      .then(result => {
        console.log('currentSession.result:::', result);
        let currentSession = result;
        this.setState({
          currentSession: currentSession
        });
        return currentSession;
      })
      .catch(error => {
        console.log('error:::', error);
      });
  }

  componentDidCatch(error, errorInfo) {
    console.log('Custom error handling!:::', error);
    // This is needed to render errors correctly in dev/prod
    super.componentDidCatch(error, errorInfo);
  }

  // componentDidUpdate(prevProps, prevState) {
  //   // console.log('window:::', window);
  //   console.log('prevProps::::', prevProps);
  //   console.log('this.props:::', this.props);
  //   console.log('prevState:::', prevState);
  //   if (this.state.sessionToken != prevState.sessionToken) {
  //     let sessionToken = this.state.sessionToken;
  //   }
  // }

  render() {
    const { Component, pageProps } = this.props;
    const { currentCredentials, currentSession } = this.state;
    console.log('_app.js -- this.props:::', this.props);
    console.log('_app.js -- this:::', this);

    return (
      <ProvideAuth session={this.state.currentSession}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ProvideAuth>
    );
  }
}

export default withApollo(MyApp);

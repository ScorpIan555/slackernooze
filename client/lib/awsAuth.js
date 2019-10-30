import config from './awsConfig';

// configuration objects passed to AWS at instantiation
const awsConfig = {
  Auth: {
    mandatorySignIn: false, // allows 'guest' users
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID
  }
};

export default awsConfig;

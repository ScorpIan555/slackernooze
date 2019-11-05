const config = require('./config');
const cognito = require('./config');

// configuration objects passed to AWS at instantiation
// console.log('config2:::', config);
// console.log('config.cognito:::', cognito);

const awsConfig = {
  Auth: {
    mandatorySignIn: false, // allows 'guest' users
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID
  }
};

const auth = {
  mandatorySignIn: false, // allows 'guest' users
  region: config.cognito.REGION,
  userPoolId: config.cognito.USER_POOL_ID,
  identityPoolId: config.cognito.IDENTITY_POOL_ID,
  userPoolWebClientId: config.cognito.APP_CLIENT_ID
};

module.exports = { awsConfig, auth };

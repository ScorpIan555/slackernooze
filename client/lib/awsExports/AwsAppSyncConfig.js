const AppSyncConfig = {
  graphqlEndpoint: 'http://localhost:4000',
  region: 'us-east-1',
  // authenticationType: 'AMAZON_COGNITO_USER_POOLS',
  authenticationType: 'AWS_IAM',
  // jwtToken: async () => token // Required when you use Cognito UserPools OR OpenID Connect. token object is obtained previously
  //   apiKey: process.env.AWS_APPSYNC_API_KEY
  apiKey: '19hkj9qql4gptovl8r216gd91u',
  idPoolId: 'us-east-1:6297712e-c017-4639-907c-7ae8afb8e6de',
  userPoolId: 'us-east-1_vxYt0hxst'
};

export default AppSyncConfig;

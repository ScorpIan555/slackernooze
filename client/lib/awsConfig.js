const dev = {
  cognito: {
    REGION: 'us-east-1',
    USER_POOL_ID: process.env.COGNITO_USER_POOL_ID,
    APP_CLIENT_ID: process.env.COGNITO_USER_POOL_CLIENT_ID,
    IDENTITY_POOL_ID: process.env.COGNITO_IDENTITY_POOL_ID
  }
};

const prod = {
  cognito: {
    REGION: '',
    USER_POOL_ID: '',
    APP_CLIENT_ID: '',
    IDENTITY_POOL_ID: ''
  }
};

// Default to dev if not set
const config = process.env.REACT_APP_STAGE === 'prod' ? prod : dev;

export default {
  // Add common config values here
  ...config
};

const dev = {
  cognito: {
    REGION: 'us-east-1',
    USER_POOL_ID: 'us-east-1_BrEUSj1Lz',
    APP_CLIENT_ID: '55q2ijm1fiktc96bc8volkdd9b',
    IDENTITY_POOL_ID: 'us-east-1:7815ded3-825f-4398-b93e-aaadb1450a45'
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

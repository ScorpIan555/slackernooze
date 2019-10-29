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
    REGION: 'us-east-1',
    USER_POOL_ID: 'us-east-1_ME6C1YYem',
    APP_CLIENT_ID: '3c2gp5pkie4bsoptg3hitfs4km',
    IDENTITY_POOL_ID: 'us-east-1:d5cb50b7-df43-4b65-b84a-0b05ff90292f'
  }
};

// Default to dev if not set
const config = process.env.REACT_APP_STAGE === 'prod' ? prod : dev;

export default {
  // Add common config values here
  ...config
};

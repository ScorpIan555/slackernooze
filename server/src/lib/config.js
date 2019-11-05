// const dev = {
//   cognito: {
//     REGION: 'us-east-1',
//     USER_POOL_ID: 'us-east-1_vxYt0hxst',
//     APP_CLIENT_ID: '19hkj9qql4gptovl8r216gd91u',
//     IDENTITY_POOL_ID: 'us-east-1:6297712e-c017-4639-907c-7ae8afb8e6de'
//   }
// };

const dev = {
  cognito: {
    REGION: 'us-east-1',
    USER_POOL_ID: 'us-east-1_vxYt0hxst',
    APP_CLIENT_ID: '19hkj9qql4gptovl8r216gd91u',
    IDENTITY_POOL_ID: 'us-east-1:6297712e-c017-4639-907c-7ae8afb8e6de'
  },
  balls: {
    fish: 'eat me'
  }
};

const cognito = {
  REGION: 'us-east-1',
  USER_POOL_ID: 'us-east-1_vxYt0hxst',
  APP_CLIENT_ID: '19hkj9qql4gptovl8r216gd91u',
  IDENTITY_POOL_ID: 'us-east-1:6297712e-c017-4639-907c-7ae8afb8e6de'
};

// const prod = {
//   cognito: {
//     REGION: '',
//     USER_POOL_ID: '',
//     APP_CLIENT_ID: '',
//     IDENTITY_POOL_ID: ''
//   }
// };

// Default to dev if not set
// const config = process.env.REACT_APP_STAGE === 'prod' ? prod : dev;
const config = dev;
console.log('config:', config);

module.exports = { config, cognito };
// Add common config values here

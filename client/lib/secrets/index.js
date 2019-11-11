let config = {
  IS_SERVER: !process.browser,
  BUNDLE_ANALYZE: process.env.BUNDLE_ANALYZE,
  NODE_ENV: process.env.NODE_ENV,
  CUSTOM_ENV: process.env.CUSTOM_ENV,
  PORT: process.env.PORT,
  HOST: process.env.HOST,
  IS_PROD: process.env.NODE_ENV === 'production',
  GA_TRACKING_ID: process.env.GA_TRACKING_ID || 'XXX-XXX-XXX',
  API_URL: process.env.API_URL,
  APP_SECRET: process.env.APP_SECRET
};

function setConfig(time) {
  return setTimeout(config, time);
}

const AUTH_TOKEN = 'auth-token';

console.log('config.config::::', config);

module.exports = {
  config,
  AUTH_TOKEN
};

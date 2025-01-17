// next.config.js
const withSass = require('@zeit/next-sass');
const Dotenv = require('dotenv-webpack');
const path = require('path');
const { envConfig } = require('./lib/secrets');

module.exports = withSass();

const configureWebpack = config => {
  // console.log('envConfig:::', envConfig);
  const { NODE_ENV, CUSTOM_ENV } = envConfig;

  config.plugins.push(
    new Dotenv({
      path: path.join(__dirname, `/lib/secrets/${NODE_ENV}-${CUSTOM_ENV}.env`),
      // path: path.join(__dirname, `/secrets/${NODE_ENV}.env`),
      safe: true
    })
  );

  if (NODE_ENV === 'development') {
    config.devtool = 'cheap-module-source-map';
  }

  // console.log('next.config.config.plugins::::', config.plugins);
  // console.log('next.config.::::', config);
  return config;
};
// 3
module.exports = withSass({
  cssModules: false,
  webpack: configureWebpack
});

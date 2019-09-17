// next.config.js
const withSass = require('@zeit/next-sass');
const Dotenv = require('dotenv-webpack');
const path = require('path');
const { NODE_ENV, CUSTOM_ENV } = require('./config/config');

module.exports = withSass();

const configureWebpack = config => {
  config.plugins.push(
    new Dotenv({
      path: path.join(__dirname, `/secrets/${NODE_ENV}-${CUSTOM_ENV}.env`),
      // path: path.join(__dirname, `/secrets/${NODE_ENV}.env`),
      safe: true
    })
  );

  if (NODE_ENV === 'development') {
    config.devtool = 'cheap-module-source-map';
  }

  console.log('next.config.config.plugins::::', config.plugins);
  return config;
};
// 3
module.exports = withSass({
  cssModules: false,
  webpack: configureWebpack
});

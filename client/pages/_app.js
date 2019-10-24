import React from 'react';
import App from 'next/app';
import { AuthProvider } from 'react-use-auth';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    );
  }
}

export default MyApp;

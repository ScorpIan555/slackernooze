import React from 'react';
import App from 'next/app';
import Router from 'next/router';
import Layout from '../components/Layout';
import UserContext from '../components/UserContext';

class MyApp extends App {
  state = {
    user: null
  };

  // componentDidMount = () => {
  //   const user = localStorage.getItem('coolapp-user');
  //   if (user) {
  //     this.setState({
  //       user
  //     });
  //   } else {
  //     Router.push('/login');
  //   }
  // };

  // signIn = (username, password) => {
  //   localStorage.setItem('coolapp-user', username);

  //   this.setState(
  //     {
  //       user: username
  //     },
  //     () => {
  //       Router.push('/');
  //     }
  //   );
  // };

  // signOut = () => {
  //   localStorage.removeItem('coolapp-user');
  //   this.setState({
  //     user: null
  //   });
  //   Router.push('/login');
  // };

  render() {
    let localStorage;
    const { Component, pageProps } = this.props;
    console.log('_app.js -- this.props:::', this.props);

    return (
      <UserContext.Provider
        value={{
          user: this.state.user,
          signIn: this.signIn,
          signOut: this.signOut
        }}
      >
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserContext.Provider>
    );
  }
}

export default MyApp;

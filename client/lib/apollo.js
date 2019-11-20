import React, { useMemo } from 'react';
import Head from 'next/head';
import { ApolloProvider } from '@apollo/react-hooks';
// import AWSAppSyncClient from 'aws-appsync'; // tb removed
import { ApolloClient } from 'apollo-client'; // tb removed for APP_Sync
import { InMemoryCache } from 'apollo-cache-inmemory';
import { AwsAppSyncConfig, AwsAmplifyAuth } from './awsExports';

import { HttpLink, createHttpLink } from 'apollo-link-http';

import { createAuthLink } from 'aws-appsync-auth-link';
import { ApolloLink } from 'apollo-link';

// https://www.howtographql.com/react-apollo/5-authentication/
import { setContext } from 'apollo-link-context';
import { AUTH_TOKEN } from './secrets';

import fetch from 'isomorphic-unfetch';

let apolloClient = null;

/**
 * Creates and provides the apolloContext
 * to a next.js PageTree. Use it by wrapping
 * your PageComponent via HOC pattern.
 * @param {Function|Class} PageComponent
 * @param {Object} [config]
 * @param {Boolean} [config.ssr=true]
 */
export function withApollo(PageComponent, { ssr = true } = {}) {
  // console.log('WithApollo.PageComponent:::', PageComponent);
  // AwsAmplifyAuth.currentCredentials()
  //   .then(results => console.log('apollo.currentCredentials():::', results))
  //   .catch(error => console.log('apollo.currentCredentials::', error));

  const WithApollo = ({ apolloClient, apolloState, ...pageProps }) => {
    // memoize apolloClient state
    const client = useMemo(
      () => apolloClient || initApolloClient(apolloState),
      []
    );
    console.log('client:::', client);
    return (
      <ApolloProvider client={client}>
        <PageComponent {...pageProps} />
      </ApolloProvider>
    );
  };

  // Set the correct displayName in development
  if (process.env.NODE_ENV !== 'production') {
    const displayName =
      PageComponent.displayName || PageComponent.name || 'Component';

    if (displayName === 'App') {
      console.warn('This withApollo HOC only works with PageComponents.');
    }

    WithApollo.displayName = `withApollo(${displayName})`;
  }

  if (ssr || PageComponent.getInitialProps) {
    WithApollo.getInitialProps = async ctx => {
      // console.log('ctx.err object:::', ctx.err);
      // console.log('ctx object:::', ctx);
      const { AppTree } = ctx;

      // Initialize ApolloClient, add it to the ctx object so
      // we can use it in `PageComponent.getInitialProp`.
      const apolloClient = (ctx.apolloClient = initApolloClient());

      // Run wrapped getInitialProps methods
      let pageProps = {};
      if (PageComponent.getInitialProps) {
        pageProps = await PageComponent.getInitialProps(ctx);
        // console.log('pageProps after get initial props call:::', pageProps);
      }

      // Only on the server:
      if (typeof window === 'undefined') {
        // When redirecting, the response is finished.
        // No point in continuing to render
        if (ctx.res && ctx.res.finished) {
          return pageProps;
        }

        // Only if ssr is enabled
        if (ssr) {
          try {
            // Run all GraphQL queries
            const { getDataFromTree } = await import('@apollo/react-ssr');
            await getDataFromTree(
              <AppTree
                pageProps={{
                  ...pageProps,
                  apolloClient
                }}
              />
            );
          } catch (error) {
            // Prevent Apollo Client GraphQL errors from crashing SSR.
            // Handle them in components via the data.error prop:
            // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
            // https://blog.apollographql.com/graphql-explained-5844742f195e#.fq5jjdw7t
            console.error('Error while running `getDataFromTree`', error);
          }

          // getDataFromTree does not call componentWillUnmount
          // head side effect therefore need to be cleared manually
          Head.rewind();
        }
      }

      // Extract query data from the Apollo store
      const apolloState = apolloClient.cache.extract();

      return {
        ...pageProps,
        apolloState
      };
    };
  }

  return WithApollo;
}

/**
 * Always creates a new apollo client on the server
 * Creates or reuses apollo client in the browser.
 * @param  {Object} initialState
 */
function initApolloClient(initialState) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (typeof window === 'undefined') {
    return createApolloClient(initialState);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = createApolloClient(initialState);
  }

  return apolloClient;
}

/**
 * Creates and configures the ApolloClient
 * @param  {Object} [initialState={}]
 */
function createApolloClient(initialState = {}) {
  //
  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem(AUTH_TOKEN);
    console.log('headers:::', headers);
    console.log('cache:::', cache);
    console.log('AUTH_TOKEN:::', AUTH_TOKEN);
    // const data = cache.readQuery({
    //   query: token
    // });

    console.log('auth.sessionToken:::', JSON.stringify(token));
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : ''
        // authorization: token ? `Bearer ${data.accessToken}` : ''
      }
    };
  });

  const httpLinkConfig = {
    // log: () => console.log('window:', window),
    uri: process.env.HOST, // Server URL (must be absolute)
    credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
    fetch
  };

  const httpLink = new HttpLink(httpLinkConfig);

  const cache = new InMemoryCache().restore(initialState);

  const ssrMode = typeof window === 'undefined';

  console.log('authLink-ln 184::', authLink);
  // console.log('token:::', token);

  // looks, right now, like this return block needs to be replaced w/ a new AWS...Client({...}) etc, etc, etc...
  return new ApolloClient({
    // great write-up of GQL visual
    // https://blog.apollographql.com/the-concepts-of-graphql-bc68bd819be3
    ssrMode, // Disables forceFetch on the server (so queries are only run once)
    // link: authLink.concat(httpLink),
    // link: new HttpLink(httpLink),
    link: ApolloLink.from([authLink, httpLink]),
    cache
  });
}

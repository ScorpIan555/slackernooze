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
  const WithApollo = ({ apolloClient, apolloState, ...pageProps }) => {
    // memoize apolloClient state
    const client = useMemo(
      () => apolloClient || initApolloClient(apolloState),
      []
    );
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
      console.log('ctx object:::', ctx);
      const { AppTree } = ctx;

      // Initialize ApolloClient, add it to the ctx object so
      // we can use it in `PageComponent.getInitialProp`.
      const apolloClient = (ctx.apolloClient = initApolloClient());

      // Run wrapped getInitialProps methods
      let pageProps = {};
      if (PageComponent.getInitialProps) {
        pageProps = await PageComponent.getInitialProps(ctx);
        console.log('pageProps after get initial props call:::', pageProps);
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
  const getAwsToken = async () => {
    let res = await AwsAmplifyAuth.currentCredentials();
    // console.log('res:::', res.sessionToken);
    return res.sessionToken;
  };

  let token = getAwsToken();

  // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
  // read this tomorrow:  https://github.com/awslabs/aws-mobile-appsync-sdk-js/issues/82ncClient
  // https://github.com/awslabs/aws-mobile-appsync-sdk-js#creating-a-client

  console.log(
    'AwsAppSyncConfig.graphqlEndpoint',
    AwsAppSyncConfig.graphqlEndpoint
  );
  console.log('AwsAppSyncConfig.region', AwsAppSyncConfig.region);
  console.log(
    'AwsAppSyncConfig.authenticationTpe',
    AwsAppSyncConfig.authenticationType
  );
  console.log('AwsAppSyncConfig.apiKey', AwsAppSyncConfig.apiKey);

  console.log('AwsAppSyncConfig.token', token);

  // console.log('AppSyncConfig.token', currentCredentials);

  // return new AWSAppSyncClient(
  //   {
  //     url: AppSyncConfig.graphqlEndpoint,
  //     region: AppSyncConfig.region,
  //     auth: {
  //       type: AppSyncConfig.authenticationType,
  //       apiKey: AppSyncConfig.apiKey,
  //       credentials: () => Auth.currentCredentials(),
  //       jwtToken: async () => token // Required when you use Cognito UserPools OR OpenID Connect. token object is obtained previously
  //     },
  //     disableOffline: true
  //   },
  //   {
  //     cache: new InMemoryCache().restore(initialState || {}),
  //     ssrMode: true
  //   }
  // );

  let url = AwsAppSyncConfig.graphqlEndpoint;

  let auth = {
    type: AwsAppSyncConfig.authenticationType,
    apiKey: AwsAppSyncConfig.apiKey
  };
  let region = {
    region: AwsAppSyncConfig.region
  };

  // let link = ApolloLink.from([createAuthLink({ url, region, auth })]);
  let link = ApolloLink.from([
    createAuthLink({ url, region, auth }),
    createHttpLink({ uri: url }) // incl per https://github.com/awslabs/aws-mobile-appsync-sdk-js/issues/473
  ]);

  return new ApolloClient({
    ssrMode: typeof window === 'undefined', // Disables forceFetch on the server (so queries are only run once)
    link,
    // cache: new InMemoryCache().restore(initialState)
    cache: new InMemoryCache()
  });

  // looks, right now, like this return block needs to be replaced w/ a new AWS...Client({...}) etc, etc, etc...
  // return new ApolloClient({
  //   ssrMode: typeof window === 'undefined', // Disables forceFetch on the server (so queries are only run once)
  //   link: new HttpLink({
  //     // TODO need to change this to an env variable
  //     uri: 'http://localhost:4000', // Server URL (must be absolute)
  //     credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
  //     fetch
  //   }),
  //   cache: new InMemoryCache().restore(initialState)
  // });
}

import React, { Component } from 'react';
import NewsLink from './NewsLink';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { NetworkStatus } from 'apollo-client';

const FEED_QUERY = gql`
  {
    feed(first: 10, skip: 0, orderBy: createdAt_DESC) {
      links {
        id
        url
        description
      }
    }
  }
`;

const feedQueryVars = {
  skip: 0,
  first: 12
};

const queryOptions = {
  variables: feedQueryVars,
  notifyOnNetworkStatusChange: true
};

const LinkList = props => {
  return (
    <Query query={FEED_QUERY} options={queryOptions}>
      {({ loading, error, data, NetworkStatus }) => {
        {
          /* console.log('loading:::', loading);
        console.log('error:::', error);
        console.log('data:::', data);
        console.log('networkStatus::', NetworkStatus); */
        }
        if (loading) return <div>Fetching</div>;
        if (error) return <div>Error</div>;

        const linksToRender = data.feed.links;
        return (
          <div>
            {linksToRender.map(link => (
              <NewsLink key={link.id} link={link} />
            ))}
          </div>
        );
      }}
    </Query>
  );
};

export default LinkList;

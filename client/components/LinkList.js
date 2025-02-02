import React, { Component } from 'react';
import Link from './Link';
import { Query } from 'react-apollo';
import { FEED_QUERY } from '../lib/graphql';
import { NetworkStatus } from 'apollo-client';

const feedQueryVars = {
  skip: 0,
  first: 12
};

const queryOptions = {
  variables: feedQueryVars,
  notifyOnNetworkStatusChange: true
};

const _updateCacheAfterVote = (store, createVote, linkId) => {
  const data = store.readQuery({ query: FEED_QUERY });

  const votedLink = data.feed.links.find(link => link.id === linkId);
  votedLink.votes = createVote.link.votes;

  store.writeQuery({ query: FEED_QUERY, data });
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
            {linksToRender.map((link, index) => (
              <Link
                key={link.id}
                link={link}
                index={index}
                updateStoreAfterVote={_updateCacheAfterVote}
              />
            ))}
          </div>
        );
      }}
    </Query>
  );
};

export default LinkList;

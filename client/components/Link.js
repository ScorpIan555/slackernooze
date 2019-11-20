import React, { Component } from 'react';
import { AUTH_TOKEN } from '../lib/secrets';
import { timeDifferenceForDate } from '../lib/guiUtils';
import { VOTE_MUTATION } from '../lib/graphql';
import { Mutation } from 'react-apollo';
import { useAuth } from '../lib/stateManagement';

const Link = props => {
  console.log('Link.props:::', props);
  let auth = useAuth();
  let authToken = auth.sessionToken;

  const handleClick = props => {
    // event.preventDefault();
    console.log('Vote.handleClick:::', props);
  };

  const updateStoreAfterVote = () => {
    console.log('updateStoreAfterVote! ::: ', store, vote, props);
  };

  return (
    <div className="flex mt2 items-start">
      <div className="flex items-center">
        <span className="gray">{props.index + 1}.</span>
        {authToken && (
          <Mutation
            mutation={VOTE_MUTATION}
            variables={{ linkId: props.link.id }}
            onClick={handleClick(props)}
            update={(store, { data: { vote } }) =>
              props.updateStoreAfterVote(store, vote, props.link.id)
            }
          >
            {voteMutation => (
              <div className="ml1 gray f11" onClick={voteMutation}>
                ▲
              </div>
            )}
          </Mutation>
        )}
      </div>
      <div className="ml1">
        <div>
          {props.link.description} ({props.link.url})
        </div>
        <div className="f6 lh-copy gray">
          {props.link.votes.length} votes | by{' '}
          {props.link.postedBy ? props.link.postedBy.name : 'Unknown'}{' '}
          {timeDifferenceForDate(props.link.createdAt)}
        </div>
      </div>
    </div>
  );
};

export default Link;

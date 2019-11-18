import React, { Component } from 'react';
import { AUTH_TOKEN } from '../lib/secrets';
import { timeDifferenceForDate } from '../lib/guiUtils';

const Link = props => {
  let auth = useAuth();
  let authToken = auth.sessionToken;

  return (
    <div className="flex mt2 items-start">
      <div className="flex items-center">
        <span className="gray">{props.index + 1}.</span>
        {authToken && (
          <div className="ml1 gray f11" onClick={() => _voteForLink()}>
            ▲
          </div>
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

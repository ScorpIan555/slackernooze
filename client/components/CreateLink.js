import React, { useState, useEffect } from 'react';
import { GraphQLMutation, CREATE_POST_MUTATION } from '../lib/graphql';
import { useAuth } from '../lib/stateManagement';
import { FEED_QUERY } from '../lib/graphql';
import { useRouter } from 'next/router';

const CreateLink = props => {
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const auth = useAuth();
  const router = useRouter();
  const authToken = auth.sessionToken;
  const user = auth.user;

  useEffect(() => {
    console.log('description:::', description);
    console.log('CreateLink Props:::', auth);
  });

  useEffect(() => {
    console.log('url:::', url);
  });

  return (
    authToken && (
      <div>
        <div className="flex flex-column mt3">
          <input
            className="mb2"
            value={description}
            onChange={event => setDescription(event.target.value)}
            type="text"
            placeholder="A description for the link"
          />
          <input
            className="mb2"
            value={url}
            onChange={event => setUrl(event.target.value)}
            type="text"
            placeholder="A url for the link"
          />
        </div>
        <GraphQLMutation
          name="createNewLink"
          mutation={CREATE_POST_MUTATION}
          variables={{ description, url }}
          onCompleted={() => router.push('/')}
          update={(store, { data: { post } }) => {
            const data = store.readQuery({ query: FEED_QUERY });
            data.feed.links.unshift(post);
            store.writeQuery({
              query: FEED_QUERY,
              data
            });
          }}
        />
      </div>
    )
  );
};

export default CreateLink;

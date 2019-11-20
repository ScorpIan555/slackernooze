import React, { useState, useEffect } from 'react';
import { GraphQLMutation, CREATE_POST_MUTATION } from '../lib/graphql';
import { useAuth } from '../lib/stateManagement';

const CreateLink = props => {
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const auth = useAuth();
  const authToken = auth.sessionToken;
  const user = auth.user;
  const userEmail = user != undefined ? user.email : null;
  const createdAt = new Date().getTime();
  // const [createPost, { loading }] = useMutation(POST_MUTATION);

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
          variables={{ description, url, createdAt, userEmail }}
        />
      </div>
    )
  );
};

export default CreateLink;

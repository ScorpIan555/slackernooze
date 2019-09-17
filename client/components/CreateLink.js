import React, { useState, useEffect } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const POST_MUTATION = gql`
  mutation PostMutation($description: String!, $url: String!) {
    post(description: $description, url: $url) {
      id
      # createdAt
      url
      description
    }
  }
`;

const CreateLink = () => {
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  // const [createPost, { loading }] = useMutation(POST_MUTATION);

  useEffect(() => {
    console.log('description:::', description);
  });

  useEffect(() => {
    console.log('url:::', url);
  });

  return (
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
      <Mutation mutation={POST_MUTATION} variables={{ description, url }}>
        {postMutation => <button onClick={postMutation}>Submit</button>}
      </Mutation>
    </div>
  );
};

export default CreateLink;

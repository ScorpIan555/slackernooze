import React, { useState, useEffect } from 'react';
import GraphQLMutation from './GraphQLMutation';
import { POST_MUTATION } from '../lib/graphql';

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
      <GraphQLMutation
        mutation={POST_MUTATION}
        variables={{ description, url }}
      />
    </div>
  );
};

export default CreateLink;

{
  /* //  <Mutation mutation={POST_MUTATION} variables={{ description, url }}>
//         {postMutation => <button onClick={postMutation}>Submit</button>}
//       </Mutation> */
}

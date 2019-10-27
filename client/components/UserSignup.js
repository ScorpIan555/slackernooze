import React, { useState, useEffect } from 'react';

const UserSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [createPost, { loading }] = useMutation(POST_MUTATION);

  useEffect(() => {
    console.log('email:::', email);
  });

  useEffect(() => {
    console.log('password:::', password);
  });

  const handleClick = async event => {
    event.preventDefault();
    console.log('event.target:::', event.target);
  };

  return (
    <div>
      <div className="flex flex-column mt3">
        <input
          className="mb2"
          value={email}
          onChange={event => setEmail(event.target.value)}
          type="text"
          placeholder="username"
        />
        <input
          className="mb3"
          value={password}
          onChange={event => setPassword(event.target.value)}
          type="password"
          placeholder="A url for the link"
        />
      </div>
      {/* <Mutation mutation={POST_MUTATION} variables={{ description, url }}>
        {postMutation => <button onClick={postMutation}>Submit</button>p}
      </Mutation> */}
      <button onClick={handleClick}>Submit</button>
    </div>
  );
};

export default UserSignup;

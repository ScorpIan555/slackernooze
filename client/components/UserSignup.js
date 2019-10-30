import React, { useState, useEffect } from 'react';
import { useAuthRequest } from '../store/index';
import { FETCHING, SUCCESS, ERROR } from '../store/actionTypes';

const UserSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [createPost, { loading }] = useMutation(POST_MUTATION);

  const method = 'signUp';
  let params = {
    email,
    password
  };

  // const handleClick = async event => {
  const [{ status, response }, makeRequest] = useAuthRequest(
    'endpoint',
    method,
    params
  );
  // const result = await useAuthRequest(method, params);
  // console.log('result:::', result);
  // return result;
  // };

  useEffect(() => {
    console.log('email:::', email);
  });

  useEffect(() => {
    console.log('password:::', password);
  });

  // const handleClick = async event => {
  //   event.preventDefault();
  // console.log('event.target:::', event.target);
  return (
    <div>
      <div className="flex flex-column mt3">
        <input
          className="mb2"
          value={email}
          onChange={event => setEmail(event.target.value)}
          type="text"
          placeholder="email"
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
      <button onClick={makeRequest}>Submit</button>
    </div>
  );
};
// };

export default UserSignup;

import React, { useState, useEffect } from 'react';
import { useAuthRequest } from '../store/index';
import { FETCHING, SUCCESS, ERROR } from '../store/actionTypes';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [confirmPassword, setConfirmPassword] = useState('');
  const [validateForm, setValidateForm] = useState(false);
  // const [createPost, { loading }] = useMutation(POST_MUTATION);

  const method = 'signIn';
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

  useEffect(() => {
    console.log('email:::', email);
  });

  useEffect(() => {
    console.log('password:::', password);
  });

  // const handleInvalidPassword = event => {
  //   event.preventDefault();

  //   alert('Your passwords do not match: YOU SHALL NOT PASS!');
  // };

  // const handleClick = async event => {
  //   event.preventDefault();
  // console.log('event.target:::', event.target);
  return (
    <div>
      <div className="flex flex-column mt3">
        <div>
          <input
            className="mb2"
            value={email}
            onChange={event => setEmail(event.target.value)}
            type="text"
            placeholder="email"
          />
          <br />
        </div>

        <div>
          <input
            className="mb3"
            value={password}
            onChange={event => setPassword(event.target.value)}
            type="password"
            placeholder="password"
          />
        </div>
      </div>
      {/* <Mutation mutation={POST_MUTATION} variables={{ description, url }}>
        {postMutation => <button onClick={postMutation}>Submit</button>p}
      </Mutation> */}
      <div>
        <button onClick={makeRequest}>Submit</button>
      </div>
      {status === FETCHING && (
        <div className="api-request__fetching">Fetching...</div>
      )}
      {status === SUCCESS && (
        <div className="api-request__user-info-container">
          <div className="api-request__user-email">{response.data.email}</div>
        </div>
      )}
      {status === ERROR && (
        <div className="api-request__error-container">
          <div className="api-request__error-response">
            {JSON.stringify(response)}
          </div>
        </div>
      )}
    </div>
  );
};
export default Login;

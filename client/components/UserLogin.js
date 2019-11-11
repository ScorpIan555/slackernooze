import React, { useState, useEffect } from 'react';
import { useAuthRequest } from '../store/index';
import { FETCHING, SUCCESS, ERROR } from '../store/actionTypes';
import { AUTH_TOKEN } from '../lib/secrets';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [login, setLogin] = useState(true);

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

  const _confirm = async () => {
    console.log('_confirm:::', confirm);
  };

  const _saveUserData = token => {
    localStorage.setItem(AUTH_TOKEN, token);
    console.log('token:::', token);
  };

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
            value={name}
            onChange={event => setName(event.target.value)}
            type="text"
            placeholder="name"
          />
          <br />
        </div>
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

      <div className="flex mt3">
        <div className="pointer mr2 button" onClick={() => this._confirm()}>
          {login ? 'login' : 'create account'}
        </div>
        <div
          className="pointer button"
          onClick={() => setLogin({ login: !login })}
        >
          {login ? 'need to create an account?' : 'already have an account?'}
        </div>
      </div>

      {/* <Mutation mutation={POST_MUTATION} variables={{ description, url }}>
        {postMutation => <button onClick={postMutation}>Submit</button>p}
      </Mutation> */}
      <div>
        <button onClick={makeRequest}>Login</button>
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

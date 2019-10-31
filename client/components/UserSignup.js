import React, { useState, useEffect } from 'react';
import { useAuthRequest } from '../store/index';
import { FETCHING, SUCCESS, ERROR } from '../store/actionTypes';

const UserSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [confirmPassword, setConfirmPassword] = useState('');
  const [validateForm, setValidateForm] = useState(false);
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

  useEffect(() => {
    console.log('email:::', email);
  });

  useEffect(() => {
    console.log('password:::', password);
    console.log('confirmPassword:::', confirmPassword);
    console.log('validateForm', validateForm);
    password === confirmPassword && password.length > 0
      ? setValidateForm(true)
      : setValidateForm(false);
  });

  const handleInvalidPassword = event => {
    event.preventDefault();

    alert('Your passwords do not match: YOU SHALL NOT PASS!');
  };

  // const handleClick = async event => {
  //   event.preventDefault();
  // console.log('event.target:::', event.target);
  return (
    <div>
      <form>
        <div className="flex flex-column mt3">
          <input
            className="mb2"
            value={email}
            onChange={event => setEmail(event.target.value)}
            type="text"
            placeholder="email"
          />
          <br />
          <div>
            <input
              className="mb3"
              value={password}
              onChange={event => setPassword(event.target.value)}
              type="password"
              placeholder="password"
            />
          </div>

          <input
            className="mb3"
            value={confirmPassword}
            onChange={event => setConfirmPassword(event.target.value)}
            type="password"
            placeholder="password"
          />
        </div>
        {/* <Mutation mutation={POST_MUTATION} variables={{ description, url }}>
        {postMutation => <button onClick={postMutation}>Submit</button>p}
      </Mutation> */}
        <div>
          {validateForm ? (
            <button onClick={makeRequest}>Submit</button>
          ) : (
            <button onClick={handleInvalidPassword}>You Shall Not Pass</button>
          )}
        </div>
      </form>
      {status === FETCHING && (
        <div className="api-request__fetching">Fetching...</div>
      )}
      {status === SUCCESS && (
        <div className="api-request__user-info-container">
          <div className="api-request__user-name">{response.data.name}</div>
          <div className="api-request__user-email">{response.data.email}</div>
          <div className="api-request__user-phone">{response.data.phone}</div>
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
// };

export default UserSignup;

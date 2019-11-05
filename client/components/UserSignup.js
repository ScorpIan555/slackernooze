import React, { useState, useEffect } from 'react';
import { useAuthRequest } from '../store/index';
import { FETCHING, SUCCESS, ERROR } from '../store/actionTypes';
import { Mutation } from 'react-apollo';
import { SIGNUP_MUTATION } from '../lib/graphql';
import { GraphQLMutation } from '../lib/graphql';

const UserSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const [confirmPassword, setConfirmPassword] = useState('');
  const [validateForm, setValidateForm] = useState(false);
  // const [createPost, { loading }] = useMutation(POST_MUTATION);

  const method = 'signUp';
  let params = {
    name,
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
    // console.log('email:::', email);
  });

  useEffect(() => {
    // console.log('password:::', password);
    // console.log('confirmPassword:::', confirmPassword);
    // console.log('validateForm', validateForm);
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
        <div>
          <input
            className="mb3"
            value={confirmPassword}
            onChange={event => setConfirmPassword(event.target.value)}
            type="password"
            placeholder="password"
          />
        </div>
      </div>
      <Mutation
        mutation={SIGNUP_MUTATION}
        variables={{ name, email, password }}
      >
        {postMutation => <button onClick={postMutation}>Submit</button>}
      </Mutation>

      <div>
        {validateForm ? (
          <GraphQLMutation
            name="userSignup"
            mutation={SIGNUP_MUTATION}
            variables={{ name, email, password }}
          />
        ) : (
          <button onClick={handleInvalidPassword}>You Shall Not Pass</button>
        )}
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
// };

export default UserSignup;

// {/* {status === FETCHING && (
//     <div className="api-request__fetching">Fetching...</div>
//   )}
//   {status === SUCCESS && (
//     <div className="api-request__user-info-container">
//       <div className="api-request__user-email">SUCCESS</div>
//     </div>
//   )}
//   {status === ERROR && (
//     <div className="api-request__error-container">
//       <div className="api-request__error-response">
//         {JSON.stringify(response)}
//       </div>
//     </div>
//   )} */}

import React, { useState, useEffect, useReducer } from 'react';
import { useRouter } from 'next/router';
import { SIGNUP_MUTATION, GraphQLMutation } from '../lib/graphql';
import {
  useAuth,
  useAuthRequest,
  synchronousReducer,
  FETCHING,
  SUCCESS,
  ERROR
} from '../lib/stateManagement';

// set initialState within the component
const initialState = {
  // synchronous action/reducer fields
  username: '',
  password: '',
  name: '',
  confirmPassword: '',
  validateForm: false,
  method: '',
  // async action/reducer fields
  status: null,
  response: null
};

const UserSignup = () => {
  // initialize auth object in order to use user mgt
  let auth = useAuth();
  // initialize router object
  const router = useRouter();
  // create validateForm state mgt hooks
  const [validateForm, setValidateForm] = useState(false);
  const [method, setMethod] = useState('');
  // setMethod('signUp');
  const [email, setEmail] = useState('');
  // create state objects for form fields
  // note: kept separate from form validation as they're using different functions
  const [state, dispatch] = useReducer(synchronousReducer, initialState);
  // destructure and assign state values
  const { name, username, password, confirmPassword } = state;
  // create method variable and params object for auth api call
  let params = { name, username, password };
  // initialize hook to call aws api
  const [{ status, response }, makeRequest] = useAuthRequest(method, params);

  // handle controlled form component
  const handleOnChange = event => {
    // need to set method t/b passed to 3rd pary Auth api call
    setMethod('signUp');
    // synchronous dispatch
    dispatch({ field: event.target.name, value: event.target.value });
  };

  // signup user
  const handleSignUp = async event => {
    try {
      // call the auth api, update client state
      await makeRequest(method, params);
      // toggle client state to indicate that a user is now signed in
      // navigate back to home page after everything's kosher
      // auth.toggleIsLoggedInBoolean();
      router.push('/confirmUser');
    } catch (error) {
      console.log('error:::', error.message);
      console.error(error);
    }
  };

  // error handler for passwords not matching
  const handleInvalidPassword = event => {
    event.preventDefault();
    alert('Your passwords do not match: YOU SHALL NOT PASS!');
  };

  useEffect(() => {
    setMethod('signUp');
    console.log('method::::', method);
    setEmail(username);
    // const prefix = method.charAt(0).toUpperCase() + method.slice(1);
    // console.log('prefix check:::', prefix);
  });

  // validate password form in create field
  useEffect(() => {
    password === confirmPassword && password.length > 0
      ? setValidateForm(true)
      : setValidateForm(false);
  });

  return (
    <div>
      <div className="flex flex-column mt3">
        <div>
          <input
            name="name"
            className="mb2"
            value={name}
            onChange={handleOnChange}
            type="text"
            placeholder="name"
          />
          <br />
        </div>

        <div>
          <input
            name="username"
            className="mb2"
            value={username}
            onChange={handleOnChange}
            type="text"
            placeholder="username"
          />
          <br />
        </div>

        <div>
          <input
            name="password"
            className="mb3"
            value={password}
            onChange={handleOnChange}
            type="password"
            placeholder="password"
          />
        </div>

        <div>
          <input
            name="confirmPassword"
            className="mb3"
            value={confirmPassword}
            onChange={handleOnChange}
            type="password"
            placeholder="confirm password"
          />
        </div>
      </div>

      <div>
        {validateForm ? (
          <GraphQLMutation
            name="signUp"
            mutation={SIGNUP_MUTATION}
            variables={{ name, email, password }}
            handleAwsCall={handleSignUp}
            onCompleted={data => confirm()}
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
          {response != undefined || null ? (
            <div className="api-request__user-username">{response.status}</div>
          ) : null}
        </div>
      )}
      {status === ERROR && alert(response.message)}
    </div>
  );
};

export default UserSignup;

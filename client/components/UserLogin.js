import React, { useState, useEffect, useReducer } from 'react';
import { useRouter } from 'next/router';
import { useAuthRequest } from '../lib/stateManagement/store/index';
import {
  FETCHING,
  SUCCESS,
  ERROR
} from '../lib/stateManagement/store/actionTypes';
import { AUTH_TOKEN } from '../lib/secrets';
import { useAuth } from '../lib/stateManagement';
import {
  asynchronousReducer,
  synchronousReducer
} from '../lib/stateManagement';
import { Mutation } from 'react-apollo';
import { SIGNUP_MUTATION, GraphQLMutation } from '../lib/graphql';

// set initialState within the component
const initialState = {
  // synchronous action/reducer fields
  email: '',
  password: '',
  name: '',
  confirmPassword: '',
  validateForm: false,
  method: '',
  // async action/reducer fields
  status: null,
  response: null
};

const Login = () => {
  // initialize auth object in order to use user mgt
  let auth = useAuth();
  // initialize router object
  const router = useRouter();
  // create validateForm state mgt hooks
  const [validateForm, setValidateForm] = useState(false);
  const [method, setMethod] = useState('');
  // create state objects for form fields
  // note: kept separate from form validation as they're using different functions
  const [state, dispatch] = useReducer(synchronousReducer, initialState);
  // destructure and assign state values
  const { name, email, password, confirmPassword } = state;
  // create method variable and params object for auth api call
  let params = { name, email, password };
  // initialize hook to call aws api
  const [{ status, response }, makeRequest] = useAuthRequest(method, params);

  // handle controlled form component
  const handleOnChange = event => {
    setMethod('signUp');
    console.log('onChange:::', event.target.value);
    dispatch({ field: event.target.name, value: event.target.value });
  };

  // signup user
  const handleSignIn = async event => {
    console.log('method/params:::', method, params);
    console.log('isUserToggledIn???:::', auth.isUserLoggedIn);
    auth.toggleIsUserLoggedInBoolean();
    console.log('isUserToggledIn???:::', auth.isUserLoggedIn);
    try {
      await makeRequest(method, params);
      router.push('/');
    } catch (error) {
      console.log('error:::', error.message);
      console.error(error);
    }
  };

  const _confirm = async () => {
    console.log('_confirm:::', confirm);
  };

  const _saveUserData = token => {
    localStorage.setItem(AUTH_TOKEN, token);
    console.log('token:::', token);
  };

  return (
    <div>
      <div className="flex flex-column mt3">
        <div>
          <input
            className="mb2"
            value={email}
            // onChange={event => setEmail(event.target.value)}
            onChange={handleOnChange}
            type="text"
            placeholder="email"
          />
          <br />
        </div>

        <div>
          <input
            className="mb3"
            value={password}
            // onChange={event => setPassword(event.target.value)}
            onChange={handleOnChange}
            type="password"
            placeholder="password"
          />
        </div>
      </div>

      <div className="flex mt3">
        {/* <div className="pointer mr2 button" onClick={() => this._confirm()}>
          {login ? 'login' : 'create account'}
        </div> */}
        {/* <div
          className="pointer button"
          onClick={() => setLogin({ login: !login })}
        >
          {login ? 'need to create an account?' : 'already have an account?'}
        </div> */}
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

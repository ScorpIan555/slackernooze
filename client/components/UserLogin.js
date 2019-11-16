import React, { useState, useEffect, useReducer } from 'react';
import { useRouter } from 'next/router';
import { AUTH_TOKEN } from '../lib/secrets';
import {
  useAuth,
  useAuthRequest,
  synchronousReducer,
  FETCHING,
  SUCCESS,
  ERROR
} from '../lib/stateManagement';
import { GraphQLMutation, LOGIN_MUTATION } from '../lib/graphql';

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

const Login = () => {
  // initialize auth object in order to use user mgt
  let auth = useAuth();
  // initialize router object
  const router = useRouter();
  // create validateForm state mgt hooks
  const [validateForm, setValidateForm] = useState(false);
  const [method, setMethod] = useState('');
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
    setMethod('signIn');
    console.log('onChange:::', event.target.value);
    dispatch({ field: event.target.name, value: event.target.value });
  };

  // signup user
  const handleSignIn = async event => {
    try {
      // call the auth api, update client state
      await makeRequest(method, params);
      // toggle client state to indicate that a user is now signed in
      // navigate back to home page after everything's kosher
      auth.toggleIsLoggedInBoolean();
      router.push('/');
    } catch (error) {
      console.log('error:::', error.message);
      console.error(error);
    }
  };

  const _confirm = async () => {
    console.log('_confirm:::', confirm);

    // per the tutorial, this is a callback that gets the token after the mutation
    // this would be like what i need to do with the getSession() call
    // from the getSession() call, I the would need to set the token
    
    //
    //

    // const { token } = this.state.login ? data.login : data.signup;
    // this._saveUserData(token);
    // this.props.history.push(`/`);
  };

  const _saveUserData = token => {
    localStorage.setItem(AUTH_TOKEN, token);
    console.log('token:::', token);
  };

  useEffect(() => {
    setEmail(username);
    console.log('email::', username);
  });

  return (
    <div>
      <div className="flex flex-column mt3">
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
      </div>

      <div>
        <button onClick={handleSignIn}>Login</button>
      </div>
      <div>
        <GraphQLMutation
          name="signIn"
          mutation={LOGIN_MUTATION}
          variables={{ email, password }}
          handleAwsCall={handleSignIn}
          onCompleted={data => _confirm(data)}
        />
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
      {status === ERROR && (
        <div className="api-request__error-container">
          <div className="api-request__error-response">
            {JSON.stringify(response.message)}
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;

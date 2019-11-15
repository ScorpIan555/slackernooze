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

const initialState = {
  code: ''
};

const UserConfirmSignup = () => {
  // initialize auth object in order to use user mgt
  let auth = useAuth();
  // initialize router object
  const router = useRouter();
  // create state mgt hooks
  const [username, setUsername] = useState(auth.usernameFromSignUp);
  const [method, setMethod] = useState('');
  //   const [confirmCode, setConfirmCode] = useState(false);
  const [state, dispatch] = useReducer(synchronousReducer, initialState);
  // destructure and assign state values
  const { code } = state;
  // create vars to pass into api request
  let params = { username, code };
  // initialize hook to call aws api
  const [{ status, response }, makeRequest] = useAuthRequest(method, params);

  // handle controlled form component
  const handleOnChange = event => {
    console.log('auth:::', auth);
    {
      auth.user != undefined || null
        ? setUsername(auth.user.username)
        : setUsername('vandaleyindustriesllc@gmail.com');
    }

    // need to set method t/b passed to 3rd pary Auth api call
    setMethod('confirmSignUp');
    // synchronous dispatch
    dispatch({ field: event.target.name, value: event.target.value });
    console.log('handleOnChange.code:::', code);
    console.log('handleOnChange.code:::', username);
    console.log('handleOnChange.method:::', method);
  };

  // confirm code
  const handleConfirmCode = async event => {
    try {
      console.log('params:::', params);
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

  return (
    <div>
      <div className="flex flex-column mt3">
        <p>Please, check your email.</p>
        <p>
          You should see a 6-digit code, please enter that to confirm your
          account.
        </p>
        <div>
          <input
            name="code"
            className="mb2"
            value={code}
            onChange={handleOnChange}
            type="text"
            placeholder="enter confirmation code"
          />
          <br />
        </div>
      </div>
      <div>
        <br />
        <button onClick={handleConfirmCode}> Submit Code</button>
      </div>

      {/* <div>
        {validateForm ? (
          <GraphQLMutation
            name="signUp"
            mutation={SIGNUP_MUTATION}
            variables={{ name, email, password }}
            handleAwsCall={handleSignUp}
          />
        ) : (
          <button onClick={handleInvalidPassword}>You Shall Not Pass</button>
        )}
      </div> */}
      {/* {status === FETCHING && (
        <div className="api-request__fetching">Fetching...</div>
      )}
      {status === SUCCESS && (
        <div className="api-request__user-info-container">
          {response != undefined || null ? (
            <div className="api-request__user-username">{response.status}</div>
          ) : null}
        </div>
      )}
      {status === ERROR && alert(response.message)} */}
    </div>
  );
};

export default UserConfirmSignup;

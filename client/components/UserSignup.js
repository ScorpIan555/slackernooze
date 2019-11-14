import React, { useState, useEffect, useContext, useReducer } from 'react';
import { useAuthRequest } from '../lib/stateManagement/store/index';
import {
  FETCHING,
  SUCCESS,
  ERROR
} from '../lib/stateManagement/store/actionTypes';
import {
  asynchronousReducer,
  synchronousReducer
} from '../lib/stateManagement';
import { Mutation } from 'react-apollo';
import { SIGNUP_MUTATION, GraphQLMutation } from '../lib/graphql';
import { useAuth } from '../lib/stateManagement';

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

const UserSignup = () => {
  // initialize auth object in order to use user mgt
  let auth = useAuth();
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
  const onChange = event => {
    setMethod('signUp');
    console.log('onChange:::', event.target.value);
    dispatch({ field: event.target.name, value: event.target.value });
  };

  // signup user
  const asyncSignUpAction = async event => {
    console.log('method:::', method);
    makeRequest(method, params);
  };

  // signin user
  const asyncSignInAction = async () => {
    makeRequest('signIn', params);
  };

  // signout user
  const asyncSignOutAction = async () => {
    makeRequest('signOut', params);
  };

  // error handler for passwords not matching
  const handleInvalidPassword = event => {
    event.preventDefault();
    alert('Your passwords do not match: YOU SHALL NOT PASS!');
  };

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
            // onChange={event => setName(event.target.value)}
            onChange={onChange}
            type="text"
            placeholder="name"
          />
          <br />
        </div>
        <div>
          <input
            name="email"
            className="mb2"
            value={email}
            // onChange={event => setEmail(event.target.value)}
            onChange={onChange}
            type="text"
            placeholder="email"
          />
          <br />
        </div>

        <div>
          <input
            name="password"
            className="mb3"
            value={password}
            // onChange={event => setPassword(event.target.value)}
            onChange={onChange}
            type="password"
            placeholder="password"
          />
        </div>
        <div>
          <input
            name="confirmPassword"
            className="mb3"
            value={confirmPassword}
            // onChange={event => setConfirmPassword(event.target.value)}
            onChange={onChange}
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
            handleAwsCall={asyncSignUpAction}
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
          <div className="api-request__user-email">{response.status}</div>
        </div>
      )}
      {status === ERROR && alert(response.message)}
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

// /components/authUtils/index.js
import { useState, useReducer, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  useAuth,
  useAuthRequest,
  synchronousReducer,
  FETCHING,
  SUCCESS,
  ERROR
} from '../stateManagement';

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

const SharedAuth = component => {
  // (from Signup)
  // initialize auth object in order to use user mgt
  let auth = useAuth();
  // initialize router object
  const router = useRouter();
  // create validateForm state mgt hooks
  const [validateForm, setValidateForm] = useState(false);
  const [method, setMethod] = useState(component);
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

  const functionSuffix = method.charAt(0).toUpperCase() + method.slice(1);

  // handle controlled form component
  const handleOnChange = event => {
    setMethod(method);
    console.log('onChange:::', event.target.value);
    dispatch({ field: event.target.name, value: event.target.value });
    {
      email = !username ? setEmail(username) : null;
    }
  };

  const handleAuthFunction = async event => {
    try {
      console.log('params:::', params);
      // call the auth api, update client state
      await makeRequest(method, params);

      {
        // after successful request, handle isLoggedIn & navigation state
        method === 'signIn' || 'confirmSignUp'
          ? (auth.toggleIsLoggedInBoolean(), router.push('/'))
          : router.push('/confirmUser');
      }
    } catch (error) {
      console.log('error:::', error.message);
      console.error(error);
    }
  };

  const handleSignIn = handleAuthFunction();
  const handleSignUp = handleAuthFunction();
  const handleConfirmSignUp = handleAuthFunction();

  useEffect(() => {
    setMethod(component);
    setEmail('');
    setValidateForm('');
    console.log('call state:', method);
  });
  return (
    auth,
    router,
    name,
    username,
    password,
    params,
    handleSignIn,
    status,
    response,
    handleSignUp,
    handleOnChange,
    handleConfirmSignUp
  );
};

export { SharedAuth };

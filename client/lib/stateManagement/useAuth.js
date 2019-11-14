import { createContext, useState, useContext } from 'react';
import Auth from '@aws-amplify/auth';

const authContext = createContext();

export const ProvideAuth = ({ children }) => {
  // initialize an value for the initial application state
  const auth = useProvideAuth();
  // return the app's auth state wrapper
  return <authContext.Provider value={auth}> {children}</authContext.Provider>;
};

export const useAuth = () => {
  // wrap and return the context initialized at the top
  return useContext(authContext);
};

// Have the basic user signin working

// next step w/b getting the session token stuff working

// prob need to get the session token and then stick it into context

function useProvideAuth() {
  const [user, setUser] = useState(null);

  let isUserLoggedIn = false;
  let sessionToken = '';

  const toggleIsUserLoggedInBoolean = () => {
    console.log('toggleIsUserLoggedInBoolean:::', isUserLoggedIn);
    return !isUserLoggedIn;
  };

  const authRequestCall = async (method, params) => {
    try {
      const response = await Auth[method](params);
      response['status'] = 'ok';
      console.log('response.status::::', response.status);
      console.log('response:::', response);
      return response;
    } catch (error) {
      console.log('error:::', error);
      alert(error.message);
    }
  };

  const signUp = (method, params) => {
    return authRequestCall(method, params);
  };

  const confirmSignUp = (method, params) => {
    return authRequestCall(method, params);
  };

  const signIn = (method, params) => {
    return authRequestCall(method, params);
  };

  const signOut = (method, params) => {
    return authRequestCall(method, params);
  };

  const sendPasswordResetEmail = async () => {};

  const confirmPasswordReset = async () => {};

  const confirmPassword = async () => {};

  // Return the user object and auth methods
  return {
    sessionToken,
    user,
    signIn,
    signUp,
    signOut,
    sendPasswordResetEmail,
    confirmPasswordReset,
    confirmPassword,
    isUserLoggedIn,
    toggleIsUserLoggedInBoolean,
    confirmSignUp
  };
}

// Aws Amplify Auth built in methods
// https://aws-amplify.github.io/docs/js/authentication

// Auth.changePassword
// Auth.completeNewPassword
// Auth.confirmSignIn
// Auth.confirmSignUp
// Auth.forgotPasswordSubmit
// Auth.resendSignUp
// Auth.sendCustomChallengeAnswer
// Auth.signIn
// Auth.signUp
// Auth.updateUserAttributes
// Auth.verifyUserAttribute

// here needs to go the useProvideAuth reducer
//      https://usehooks.com/useAuth/
//      https://www.freecodecamp.org/news/build-a-react-hooks-front-end-app-with-routing-and-authentication/
//        https://github.com/iqbal125/react-hooks-routing-auth-starter
// https://www.google.com/search?q=useReducer+auth&oq=useReducer+auth&aqs=chrome..69i57j33.3860j0j7&sourceid=chrome&ie=UTF-8
// https://www.freecodecamp.org/news/state-management-with-react-hooks/

//  also need to bring in the initialized aws Auth object
//    to be called whenever the client mutates state

// https://www.howtographql.com/react-apollo/3-mutations-creating-links/
//  https://www.robinwieruch.de/react-hooks-fetch-data
//  https://overreacted.io/a-complete-guide-to-useeffect/
//  https://reactjs.org/docs/hooks-effect.html

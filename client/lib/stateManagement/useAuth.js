import { createContext, useState, useContext } from 'react';
import Auth from '@aws-amplify/auth';

const authContext = createContext();

export const ProvideAuth = ({ children, token, user, env }) => {
  console.log('ProvideAuth.children:::', children);
  console.log('ProvideAuth.token:::', token);
  console.log('ProvideAuth.user:::', user);
  // initialize an value for the initial application state
  const auth = useProvideAuth();
  if (token != undefined || null) {
    auth['sessionToken'] = token;
    console.log('ProvideAuth.auth:::', token);
  }
  if (user != undefined && auth == undefined) {
    console.log('ProvideAuth.auth.user:::', user);
    auth['user'] = user;
  }

  if (env != undefined) {
    console.log('ProvideAuth.auth.user:::', user);
    auth['env'] = env;
  }

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

function useProvideAuth(session) {
  const [user, setUser] = useState(null); // user object to share in client app
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sessionToken, setSessionToken] = useState('');

  const toggleIsLoggedInBoolean = () => {
    return setIsLoggedIn(!isLoggedIn);
  };

  /* 
    app api & state management handlers
  
  */

  // handle the request to Aws/Cognito resource
  const handleAuthRequestApiCall = async (method, params) => {
    console.log('handleAuthRequestApiCall.method', method);
    console.log('handleAuthRequestApiCall.params', params);
    try {
      // 1)
      // initialize block variables
      let response;
      let responseUser;
      let responseSessionToken;
      let responseStatus;

      // 2)
      // call Aws Cognito resource

      // 'confirmUserSignUp' should use this block
      // 'confirmUserSignUp' flow should not update state, it's a simple req/res
      if (method === 'confirmSignUp') {
        // have to call the for the current session here in order to set the token

        // response from this call is only SUCCESS or FAILURE
        response = await Auth[method](params.username, params.code);
        // response = Auth.currentSession();
        // console.log('confirmUser.response:::', response);
        // // response['status'] = 'ok';
        // let userSession =
        //   response != undefined
        //     ? response.signInUserSession.accessToken.jwtToken
        //     : null;

        // console.log('userSession:::', userSession);
        // responseSessionToken = response.signInUserSession.accessToken.jwtToken;
        return { response };
      }

      // 'signUp', 'signIn', 'signOut' should use the below block
      console.log('Auth[method](params):::', method, params);
      response = await Auth[method](params);
      console.log('response:::', response);

      // 3)
      // update client state
      //
      // if(method == 'signUp') {

      // }
      // //
      // if(method == 'signUp') {

      // }

      // 'signOut' method returns no response object, skip right to state update
      if (method != 'signOut') {
        // capture the CognitoUser.attributes object w/ the default UserPool attributes returned from auth
        //   enter those into application state (custom attributes can be added per the below)
        //   https://docs.aws.amazon.com/cognito/latest/developerguide/user-pool-settings-attributes.html

        response['status'] = 'ok';
        responseUser = response.attributes;
        console.log('handleApi.response:::', response);
        {
          method === 'signIn'
            ? (responseSessionToken =
                response.signInUserSession.accessToken.jwtToken)
            : null;
        }
        {
          // user.
          method === 'signUp'
            ? (responseSessionToken =
                response != undefined
                  ? response.user.pool.storage['auth-token']
                  : null)
            : null;
        }
      }

      // with response successfully received, update application state with user & session info
      handleAuthStateUpdate(responseUser, responseSessionToken);

      // handleSignUpStateUpdate(response)

      console.log('auth after response/state update:::', response);
      return { responseUser, responseSessionToken };
    } catch (error) {
      console.log('error:::', error);
      alert(error.message);
    }
  };

  const handleAuthStateUpdate = (responseUser, responseSessionToken) => {
    setUser(responseUser);
    setSessionToken(responseSessionToken);
    return;
  };

  /* auth store methods 



  */

  const signUp = (method, params) => {
    return handleAuthRequestApiCall(method, params);
  };

  const confirmSignUp = (method, params) => {
    return handleAuthRequestApiCall(method, params);
  };

  const signIn = (method, params) => {
    return handleAuthRequestApiCall(method, params);
  };

  const signOut = (method, params) => {
    return handleAuthRequestApiCall(method, params);
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
    isLoggedIn,
    toggleIsLoggedInBoolean,
    confirmSignUp
  };
}

// Aws Amplify Auth built in methods
// https://aws-amplify.github.io/docs/js/authentication

// // Auth.changePassword
// // Auth.completeNewPassword
// // Auth.confirmSignIn
// x// Auth.confirmSignUp
// // Auth.forgotPasswordSubmit
// // Auth.resendSignUp
// // Auth.sendCustomChallengeAnswer
// x// Auth.signIn
// x// Auth.signUp
// // Auth.updateUserAttributes
// // Auth.verifyUserAttribute

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

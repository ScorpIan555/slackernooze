import { createContext, useState, useEffect, useContext } from 'react';

const authContext = createContext();

export const ProvideAuth = ({ children }) => {
  const auth = useProvideAuth();
  console.log('useAuth.auth:::', auth);
  return <authContext.Provider value={auth}> {children}</authContext.Provider>;
}

export const useAuth = () => {
  console.log('useAuth.authContext:::', authContext);
  return useContext(authContext);
};

export const useProvideAuth = () => {
  const [user, setUser] = useState(null);

  const signUp = async obj => {

    // authRequest hook frrom store/index uses a direct call to Amplify.Auth & graphQl from component
    // this file is meant to act as the store, so need to 
    console.log('signUp:::', obj);
  };

  const signIn = async (user) => {
    
  };

  const signOut = async () => {};

  const sendPasswordResetEmail = async () => {};

  const confirmPasswordReset = async () => {};

  const confirmPassword = async () => {};
};

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

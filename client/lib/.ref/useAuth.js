import { createContext } from 'react';
const authContext = createContext();

export const ProvideAuth = ({ children }) => {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}> {children}</authContext.Provider>;
};

export const useAuth = () => {
  return useContext(authContext);
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

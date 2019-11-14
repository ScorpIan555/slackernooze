// index.js
import { useReducer } from 'react';
import { initialState, asynchronousReducer } from './reducers';
import { fetching, success, error } from './actionCreators';
import { useAuth } from '../useAuth';

// inside useApiRequest function
const useAuthRequest = (method, params) => {
  const [state, dispatch] = useReducer(asynchronousReducer, initialState);
  const auth = useAuth();

  const makeRequest = async () => {
    console.log('somebody hit make request!');
    const reqString = `${method}(${params.email}, ${params.password})`;
    console.log('reqString::::', reqString);
    console.log('auth in index:::', auth);

    dispatch(fetching());
    try {
      let response = await auth[method](method, params);
      // capture user object returned from request, enter into app state
      console.log('Auth.response:::', response);
      console.log('auth obj after Auth.response:::', auth);
      auth['user'] = response.user;
      dispatch(success(response));
    } catch (e) {
      console.log('error:::', e);
      dispatch(error(e));
    }
  };

  return [state, makeRequest];
};
export { useAuthRequest };

// index.js
import { useReducer } from 'react';
import { initialState, asynchronousReducer } from './reducers';
import { fetching, success, error } from './actionCreators';
import Auth from '@aws-amplify/auth';

// inside useApiRequest function
const useAuthRequest = (method, params) => {
  const [state, dispatch] = useReducer(asynchronousReducer, initialState);

  const makeRequest = async () => {
    console.log('somebody hit make request!');
    const reqString = `${method}(${params.email}, ${params.password})`;
    console.log('reqString::::', reqString);

    dispatch(fetching());
    try {
      //   const response = await axios[verb](endpoint, params);
      console.log(
        'Auth[method](params.email), params.password)::: ',
        method,
        params.email,
        params.password
      );

      const response = await Auth[method](params.email, params.password);
      response['status'] = 'ok';
      console.log('Auth.response:::', response);
      console.log('Auth.response:::' + JSON.stringify(response));
      dispatch(success(response));
    } catch (e) {
      console.log('error:::', e);
      dispatch(error(e));
    }
  };

  return [state, makeRequest];
};
export { useAuthRequest };

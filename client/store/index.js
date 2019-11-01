// index.js
import { useReducer } from 'react';
import reducer, { initialState } from './reducer';
import { fetching, success, error } from './actionCreators';
import Auth from '@aws-amplify/auth';
import { ConsoleLogger } from '@aws-amplify/core';

// inside useApiRequest function
const useAuthRequest = (endpoint, method, params) => {
  const [state, dispatch] = useReducer(reducer, initialState);

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
      console.log('Auth.response:::', response);
      dispatch(success(response));
    } catch (e) {
      dispatch(error(e));
    }
  };

  return [state, makeRequest];
};
export { useAuthRequest };

// lib/stateManagement/store/reducers.js
import { FETCHING, SUCCESS, ERROR } from './actionTypes';

const synchronousReducer = (state, { field, value }) => {
  return {
    ...state,
    [field]: value
  };
};

export const initialState = {
  status: null,
  response: null
};

const asynchronousReducer = (state = initialState, { type, response } = {}) => {
  switch (type) {
    case FETCHING:
      return { ...initialState, status: FETCHING };
    case SUCCESS:
      return { ...state, status: SUCCESS, response };
    case ERROR:
      return { ...state, status: ERROR, response };
    default:
      return state;
  }
};

export { synchronousReducer, asynchronousReducer };

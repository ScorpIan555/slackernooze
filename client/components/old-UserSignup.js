import React, { useState, useEffect, useContext, useReducer } from 'react';
import { useAuthRequest } from '../store/index';
import { FETCHING, SUCCESS, ERROR } from '../store/actionTypes';
import { Mutation } from 'react-apollo';
import { SIGNUP_MUTATION, GraphQLMutation } from '../lib/graphql';
import { useAuth } from '../lib/contexts';
// import { GraphQLMutation } from '../lib/graphql/gqlComponents';

const initialState = {
  email: '',
  password: '',
  name: '',
  confirmPassword: '',
  validateForm: false
};

const synchronousReducer = (state, { field, value }) => {
  return {
    ...state,
    [field]: value
  };
};

const UserSignup = () => {
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [name, setName] = useState('');

  // const [confirmPassword, setConfirmPassword] = useState('');
  const [validateForm, setValidateForm] = useState(false);

  // const [createPost, { loading }] = useMutation(POST_MUTATION);
  // let name, email, password;
  // let params = {
  //   name,
  //   email,
  //   password
  // };

  const [state, dispatch] = useReducer(synchronousReducer, initialState);

  const onChange = event => {
    console.log('onChange:::', event.target.value);
    dispatch({ field: event.target.name, value: event.target.value });
  };

  const { email, password, name, confirmPassword } = state;

  let params = {
    name,
    email,
    password
  };
  // const handleClick = async event => {
  const [{ status, response }, makeRequest] = useAuthRequest(
    'endpoint',
    'signUp',
    params
  );

  // const handleClick = (event, postMutation) => {
  //   console.log('handleClick.event::', event);
  //   console.log('handleClick.postMutation:::', postMutation);
  // };

  useEffect(() => {
    // console.log('password:::', password);
    // console.log('confirmPassword:::', confirmPassword);
    // console.log('validateForm', validateForm);
    password === confirmPassword && password.length > 0
      ? setValidateForm(true)
      : setValidateForm(false);
  });

  const handleInvalidPassword = event => {
    event.preventDefault();

    alert('Your passwords do not match: YOU SHALL NOT PASS!');
  };

  // const handleClick = async event => {
  //   event.preventDefault();
  // console.log('event.target:::', event.target);
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
      <button onClick={makeRequest}>Cheat Bitch!</button>

      <Mutation
        mutation={SIGNUP_MUTATION}
        variables={{ name, email, password }}
      >
        {postMutation => (
          <button onClick={makeRequest}>Submit in new client flow</button>
        )}
      </Mutation>

      <div>
        {validateForm ? (
          <GraphQLMutation
            fieldName="userSignup"
            mutation={SIGNUP_MUTATION}
            variables={{ name, email, password }}
            handleAwsCall={makeRequest}
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
          <div className="api-request__user-email">{response}</div>
        </div>
      )}
      {status === ERROR && (
        <div className="api-request__error-container">
          <div className="api-request__error-response">
            {JSON.stringify(response)}
          </div>
        </div>
      )}
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

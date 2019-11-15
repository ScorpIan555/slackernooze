import React, { useState, useEffect, useReducer } from 'react';
import { useRouter } from 'next/router';
import { useAuthRequest } from '../lib/stateManagement/store/index';
import {
  FETCHING,
  SUCCESS,
  ERROR
} from '../lib/stateManagement/store/actionTypes';
import {
  asynchronousReducer,
  synchronousReducer
} from '../lib/stateManagement';
import { Mutation } from 'react-apollo';
import { SIGNUP_MUTATION, GraphQLMutation } from '../lib/graphql';
import { useAuth } from '../lib/stateManagement';

const UserConfirmSignup = () => {
  // initialize auth object in order to use user mgt
  let auth = useAuth();
  // initialize router object
  const router = useRouter();
  // create validateForm state mgt hooks
  const [confirmCodeForm, setConfirmCodeForm] = useState(false);
};

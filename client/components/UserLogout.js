import React, { useState, useEffect } from 'react';
import { useAuthRequest } from '../lib/stateManagement/store/index';
import {
  FETCHING,
  SUCCESS,
  ERROR
} from '../lib/stateManagement/store/actionTypes';
import { AUTH_TOKEN } from '../lib/secrets';

const Logout = () => {
  // signout user
  const asyncSignOutAction = async () => {
    makeRequest('signOut', params);
  };

  return (
    <div>
      <button onClick={asyncSignOutAction}>You Shall Not Pass</button>
    </div>
  );
};

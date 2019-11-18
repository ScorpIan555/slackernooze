// components/Header.js
import { Fragment, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import './Header.scss';
import {
  useAuth,
  useAuthRequest,
  synchronousReducer,
  FETCHING,
  SUCCESS,
  ERROR
} from '../lib/stateManagement';

const Header = props => {
  // initialize app's shared authentication state in this component
  let auth = useAuth();
  let router = useRouter();
  // from tutorial
  // const authToken = localStorage.getItem(AUTH_TOKEN);
  let authToken = auth.sessionToken;
  // console.log('authToken::', auth);
  // console.log('authToken::', authToken);
  const [method, setMethod] = useState('signOut');
  // initialize hook to call aws api
  const [{ status, response }, makeRequest] = useAuthRequest(method);

  const handleClick = async () => {
    try {
      await makeRequest(method);
      auth.toggleIsLoggedInBoolean();
    } catch (error) {
      console.log('error:::', error.message);
      console.error(error);
    }
  };

  return (
    <Fragment>
      <div className="Header">
        <div>
          <Link href="/">{props.appTitle + ' '}</Link>
        </div>
        {auth.sessionToken ? (
          <div className="">
            <Link href="/submit">
              <a> | Submit</a>
            </Link>
          </div>
        ) : null}

        {/* conditionally render authentication buttons in the top nav */}
        {auth.isLoggedIn ? (
          <div>
            <a onClick={handleClick}>Logout</a>
          </div>
        ) : (
          <div>
            <Link href="/signup">
              <a> | Signup</a>
            </Link>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default Header;

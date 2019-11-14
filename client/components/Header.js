// components/Header.js
import { Fragment } from 'react';
import Link from 'next/link';
import './Header.scss';
import { AUTH_TOKEN } from '../lib/secrets';
import { useAuth } from '../lib/stateManagement';

const Header = props => {
  // initialize app's shared authentication state in this component
  let user = useAuth();
  // from tutorial
  // const authToken = localStorage.getItem(AUTH_TOKEN);
  const authToken = AUTH_TOKEN;
  console.log('authToken::', user);
  console.log('authToken::', authToken);

  return (
    <Fragment>
      <div className="Header">
        <div>
          <Link href="/">{props.appTitle + ' '}</Link>
        </div>
        <div className="">
          <Link href="/submit">
            <a> | Submit</a>
          </Link>
        </div>

        {/* conditionally render authentication buttons in the top nav */}
        {user.isLoggedIn ? (
          <div>
            <Link href="/login">
              <a> | Login</a>
            </Link>
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

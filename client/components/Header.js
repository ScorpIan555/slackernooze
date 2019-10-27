// components/Header.js
import { Fragment } from 'react';
import Link from 'next/link';

import './Header.scss';

const Header = props => (
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
      <div>
        <Link href="/signup">
          <a> | Signup</a>
        </Link>
      </div>
      <div>
        <Link href="/login">
          <a> | Login</a>
        </Link>
      </div>
    </div>
  </Fragment>
);

export default Header;

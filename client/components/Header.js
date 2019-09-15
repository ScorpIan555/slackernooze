// components/Header.js
import { Fragment } from 'react';
import Link from 'next/link';

import './Header.scss';

const Header = props => (
  <Fragment>
    <div className="Header">
      <Link href="/">{props.appTitle}</Link>
    </div>
    <Link href="/submit">
      <div className="Header">Submit</div>
    </Link>
  </Fragment>
);

export default Header;

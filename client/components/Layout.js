// components/Layout.js
import Head from 'next/head';
import Header from './Header';
import NavBar from './NavBar';

import './Layout.scss';
import './index.scss';

import navButtons from '../lib/guiUtils/buttonUtils';

const Layout = props => {
  console.log('Layout:::', props);
  const appTitle = `> SLACKER_NEWS`;

  return (
    <div className="Layout">
      <Head>
        <title>SLACKER_NEWS</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
      </Head>
      <Header appTitle={appTitle} />
      <div className="Content">{props.children}</div>
      <NavBar navButtons={navButtons} />
    </div>
  );
};

export default Layout;

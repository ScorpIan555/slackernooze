// pages/index.js
import LinkList from '../components/LinkList';
import { withApollo } from '../lib/apollo';
// import useAuth from '../components/customHooks/useAuth';
import Auth from '@aws-amplify/auth';

const IndexPage = props => {
  console.log('IndexPage.props:::', props);
  // console.log('IndexPage.props:::', useAuth);

  return <LinkList />;
};

// IndexPage.getInitialProps = async ({ req, res }) => {
//   console.log('get init props!');
//   let creds = await Auth.currentCredentials();
//   console.log('creds::', creds);
// };

export default withApollo(IndexPage);

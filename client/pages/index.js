// pages/index.js
import LinkList from '../components/LinkList';
import { withApollo } from '../lib/apollo';

const IndexPage = props => {
  console.log('IndexPage.props:::', props);

  return <LinkList />;
};

// IndexPage.getInitialProps = async ({ req, res }) => {
//   console.log('get init props!');
//   let creds = await Auth.currentCredentials();
//   console.log('creds::', creds);
// };

export default withApollo(IndexPage);

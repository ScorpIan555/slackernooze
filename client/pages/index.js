// pages/index.js
import LinkList from '../components/LinkList';
import { withApollo } from '../lib/apollo';
import useAuth from '../components/customHooks/useAuth';

const IndexPage = props => {
  console.log('IndexPage.props:::', props);
  console.log('IndexPage.props:::', useAuth);

  return <LinkList />;
};
export default withApollo(IndexPage);

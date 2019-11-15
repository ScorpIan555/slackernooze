import UserSignup from '../components/UserSignup';
import UserLogin from '../components/UserLogin';
import { withApollo } from '../lib/apollo';

const signup = props => {
  return (
    <div>
      <UserSignup />
      <br />
      <UserLogin />
    </div>
  );
};

export default signup;

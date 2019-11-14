import UserSignup from '../components/UserSignup';
import UserLogin from '../components/UserLogin';

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

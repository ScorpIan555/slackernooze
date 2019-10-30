import { Auth } from 'aws-amplify';

export default async function login(req, res) {
  try {
    const user = await Auth.signIn(username, password);
    console.log('AwsAuth.signup:::', user);
    return user;
  } catch (error) {
    console.error(error);
    res.status(error.status || 400).end(error.message);
  }
}

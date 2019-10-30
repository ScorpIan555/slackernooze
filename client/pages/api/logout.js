import { Auth } from 'aws-amplify';

export default async function logout(req, res) {
  try {
    await Auth.signOut();
  } catch (error) {
    console.error(error);
    res.status(error.status || 400).end(error.message);
  }
}

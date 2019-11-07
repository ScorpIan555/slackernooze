import AwsAppSyncConfig from './AwsAppSyncConfig';
import AwsAuthConfig from './AwsAuthConfig';
import Auth from '@aws-amplify/auth';
import Amplify from '@aws-amplify/auth';

const AwsAmplifyAuth = Auth;
const AwsAmplify = Amplify;

export { AwsAppSyncConfig, AwsAuthConfig, AwsAmplifyAuth, AwsAmplify };

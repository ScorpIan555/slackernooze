//  ./client/lib/graphql/_index.js
import { GraphQLMutation } from './gqlComponents';
import CREATE_POST_MUTATION from './CREATE_POST_MUTATION';
import LOGIN_MUTATION from './LOGIN_MUTATION';
import SIGNUP_MUTATION from './SIGNUP_MUTATION';
import VOTE_MUTATION from './VOTE_MUTATION';
import FEED_QUERY from './FEED_QUERY';

export {
  CREATE_POST_MUTATION,
  FEED_QUERY,
  LOGIN_MUTATION,
  SIGNUP_MUTATION,
  VOTE_MUTATION,
  GraphQLMutation
};

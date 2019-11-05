const { GraphQLServer } = require('graphql-yoga');
const { prisma } = require('./generated/prisma-client');
const dotenv = require('dotenv');
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const Link = require('./resolvers/Link');
const User = require('./resolvers/User');
const Subscription = require('./resolvers/Subscription');
const Vote = require('./resolvers/Vote');
// const awsConfig = require('./lib/awsAuth');
const auth = require('./lib/awsAuth');
const Amplify = require('@aws-amplify/auth');

console.log('auth:::', auth);

Amplify.configure({
  //  // uncomment when client-api troubleshooting is done
  Auth: auth // AWS Amplify Cognito authorization module
});

const resolvers = {
  Query,
  Mutation,
  Subscription,
  User,
  Link,
  Vote
};

let initializeEnvConfig = dotenv.config();

// 3
const server = new GraphQLServer({
  initializeEnvConfig,
  typeDefs: './src/schema.graphql',
  resolvers,
  context: request => {
    return {
      ...request,
      prisma
    };
  }
});
server.start(() => {
  dotenv.config();
  // Amplify.configure({
  //   //  // uncomment when client-api troubleshooting is done
  //   Auth: awsConfig.Auth // AWS Amplify Cognito authorization module
  // });
  console.log('APP_SECRET:::', process.env.APP_SECRET);
  console.log(`Server is running on ${process.env.HOST}:${process.env.PORT}`);
  console.log(`Server is running on http://localhost:4000`);
});

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { APP_SECRET, getUserId } = require('../utils');

const signup = async (parent, args, context, info) => {
  console.log('Mutation.signup.parent:::', parent);
  console.log('Mutation.signup.args:::', args);
  console.log('Mutation.signup.context.prisma:::', context.prisma);
  console.log('Mutation.signup.info:::', info);

  // 1
  const password = await bcrypt.hash(args.password, 10);
  // 2
  const user = await context.prisma.createUser({ ...args, password });

  // 3
  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  // 4
  return {
    token,
    user
  };
};

const login = async (parent, args, context, info) => {
  console.log('Mutation.login.parent:::', parent);
  console.log('Mutation.login.args:::', args);
  console.log('Mutation.login.context:::', context);
  console.log('Mutation.login.info:::', info);
  // 1
  const user = await context.prisma.user({ email: args.email });
  if (!user) {
    throw new Error('No such user found');
  }

  // 2
  const valid = await bcrypt.compare(args.password, user.password);
  if (!valid) {
    throw new Error('Invalid password');
  }

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  // 3
  return {
    token,
    user
  };
};

const post = (root, args, context) => {
  console.log('Mutation.post.parent:::', root);
  console.log('Mutation.post.args:::', args);
  console.log('Mutation.post.context:::', context.request.get('Authorization'));
  const userId = getUserId(context, 'post');
  console.log('Mutation.post.userId:::', userId);
  return context.prisma.createLink({
    url: args.url,
    description: args.description,
    postedBy: { connect: { id: userId } }
  });
};

const updateLink = (root, args, context, info) => {
  console.log('Mutation.update.parent:::', root);
  console.log('Mutation.update.args:::', args);
  let link = {
    id: args.id,
    description: args.description,
    url: args.url
  };
  console.log('Mutation.updateLink.link:::', root);
  return link;
};

const deleteLink = (root, args) => {
  console.log('Mutation.del.parent:::', root);
  console.log('Mutation.del.args:::', args);
  let filteredLinks = links.filter(link => link.id === args.id);
  console.log('Mutation.del.filteredLink:::', filteredLinks);

  let link = {
    id: filteredLinks.id,
    description: filteredLinks.description,
    url: filteredLinks.url
  };
  console.log('Mutation.del.link:::', link);
  return link;
};

const vote = async (parent, args, context, info) => {
  console.log('Mutation.vote.parent:::', parent);
  console.log('Mutation.vote.args:::', args);
  console.log('Mutation.vote.context:::', context);
  console.log('Mutation.vote.info:::', info);
  // 1
  const userId = getUserId(context);

  // 2
  const linkExists = await context.prisma.$exists.vote({
    user: { id: userId },
    link: { id: args.linkId }
  });
  if (linkExists) {
    throw new Error(`Already voted for link: ${args.linkId}`);
  }

  // 3
  return context.prisma.createVote({
    user: { connect: { id: userId } },
    link: { connect: { id: args.linkId } }
  });
};

module.exports = {
  signup,
  login,
  post,
  updateLink,
  deleteLink,
  vote
};

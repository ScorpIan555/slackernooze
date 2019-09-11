const feed = (root, args, context, info) => {
  console.log('Query.feed.root:::', root);
  console.log('Query.feed.args:::', args);
  console.log('Query.feed.context.prisma:::', context.prisma);
  console.log('Query.feed.info:::', info);
  return context.prisma.links();
};

module.exports = { feed };

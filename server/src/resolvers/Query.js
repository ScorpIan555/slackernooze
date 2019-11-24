async function feed(root, args, context, info) {
  const where = args.filter ? { description_contains: args.filter } : {};

  // https://github.com/prisma/prisma/issues/3897

  // console.log('where::::', where);
  console.log('Query.root:::', root);
  console.log('Query.args:::', args);
  // console.log('Query.context:::', context);
  // console.log('Query.info:::', info);

  const links = await context.prisma.links({
    where,
    skip: args.skip,
    first: args.first,
    orderBy: args.orderBy
  });
  // console.log('links:::', links);
  const count = await context.prisma
    .linksConnection({
      where
    })
    .aggregate()
    .count();
  return {
    links,
    count
  };
}

module.exports = { feed };

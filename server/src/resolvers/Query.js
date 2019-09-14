async function feed(parent, args, context, info) {
  const where = args.filter ? { description_contains: args.filter } : {};

  // console.log('where::::', where);

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

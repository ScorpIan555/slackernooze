async function feed(root, args, context, info) {
  // const where = args.filter ? { description_contains: args.filter } : {};

  // console.log('where::::', where);
  console.log('Query.root:::', root);
  console.log('Query.args:::', args);
  console.log('Query.context:::', context);
  console.log('Query.info:::', info);

  const links = await context.prisma.links({
    where: args.filter
      ? {
          OR: [
            // {
            //   AND: [
            //     {
            //       title_in: ['My biggest Adventure', 'My latest Hobbies']
            //     },
            //     {
            //       published: $published
            //     }
            //   ]
            // },
            { description_contains: args.filter },
            {
              url_contains: args.filter
            }
          ]
        }
      : {},
    // where,
    skip: args.skip,
    first: args.first,
    orderBy: args.orderBy
  });
  // console.log('links:::', links);
  const count = await context.prisma
    .linksConnection({
      // where: {
      //   OR: [
      //     { description_contains: args.filter },
      //     { url_contains: args.filter }
      //   ]
      // }
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

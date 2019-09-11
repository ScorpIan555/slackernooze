const links = (parent, args, context) => {
  console.log('User.links.parent:::', parent);
  console.log('User.links.args:::', args);
  console.log('User.links.context:::', context);
  console.log('User.links.info:::', info);
  return context.prisma.user({ id: parent.id }).links();
};

module.exports = { links };

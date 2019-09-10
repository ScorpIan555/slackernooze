const { GraphQLServer } = require("graphql-yoga");

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    // 2
    feed: () => links
  },
  Mutation: {
    //2
    post: (parent, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url
      };
      links.push(link);
      return link;
    },
    updateLink: (parent, args) => {
      let link = {
        id: args.id,
        description: args.description,
        url: args.url
      };
      return link;
    },
    deleteLink: (parent, args) => {
      console.log("parent:::", parent);
      console.log("args:::", args);
      let filteredLinks = links.filter(link => link.id === args.id);
      console.log("filteredLink:::", filteredLinks);

      let link = {
        id: filteredLinks.id,
        description: filteredLinks.description,
        url: filteredLinks.url
      };
      return link;
    }
  }
};

// 3
const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers
});
server.start(() => console.log(`Server is running on http://localhost:4000`));

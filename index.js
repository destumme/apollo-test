const { ApolloServer, gql } = require("apollo-server");

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: (root, args, context) => "Hello world!"
  }
};

const pluginTest = {
  requestDidStart: async (ctx) => {
    return {
      didResolveOperation: (ctx) => {
        console.log("ctx", ctx.operation.operation);
        console.log("didResolveOperation was hit");
      }
    };
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [pluginTest]
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

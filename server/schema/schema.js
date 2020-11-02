const qraphql = require('graphql');

const MovieType = new qraphql.GraphQLObjectType({
  name: 'Movie',
  fields: () => ({
    id: { type: qraphql.GraphQLID },
    name: { type: qraphql.GraphQLString },
    genre: { type: qraphql.GraphQLString },
  }),
});

const RootQuery = new qraphql.GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    movie: {
      type: MovieType,
      args: { id: { type: qraphql.GraphQLString } },
      resolve(parent, args) {},
    },
  },
});

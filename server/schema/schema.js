const qraphql = require('graphql');
const Movie = require('../modules/movies');

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
      resolve(parent, args) {
        Movie.findById(args.id);
      },
    },
  },
});

module.exports = new qraphql.GraphQLSchema({
  query: RootQuery,
});

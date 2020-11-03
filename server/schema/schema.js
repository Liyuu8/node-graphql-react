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

// Example:
// {
//   movie(id:"5fa08271fac9d09f9cbe79c2"){
//     name,
//     genre
//   }
// }

const Mutation = new qraphql.GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addMovie: {
      type: MovieType,
      args: {
        name: { type: qraphql.GraphQLString },
        genre: { type: qraphql.GraphQLString },
      },
      resolve(parent, args) {
        return new Movie({
          name: args.name,
          genre: args.genre,
        }).save();
      },
    },
  },
});

// Example:
// mutation {
//   addMovie(name: "天気の子", genre: "アニメ") {
//     name
//     genre
//   }
// }

module.exports = new qraphql.GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

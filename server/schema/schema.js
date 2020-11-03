const qraphql = require('graphql');
const Movie = require('../models/movie');
const Director = require('../models/director');

const MovieType = new qraphql.GraphQLObjectType({
  name: 'Movie',
  fields: () => ({
    id: { type: qraphql.GraphQLID },
    name: { type: qraphql.GraphQLString },
    genre: { type: qraphql.GraphQLString },
  }),
});

const DirectorType = new qraphql.GraphQLObjectType({
  name: 'Director',
  fields: () => ({
    id: { type: qraphql.GraphQLID },
    name: { type: qraphql.GraphQLString },
    age: { type: qraphql.GraphQLInt },
  }),
});

const RootQuery = new qraphql.GraphQLObjectType({
  // ① Typeの作成 → ② Modelの作成 → ③ Queryの作成
  name: 'RootQueryType',
  fields: {
    movie: {
      type: MovieType,
      args: { id: { type: qraphql.GraphQLID } },
      resolve(parent, args) {
        return Movie.findById(args.id);
      },
    },
    director: {
      type: DirectorType,
      args: { id: { type: qraphql.GraphQLID } },
      resolve(parent, args) {
        return Director.findById(args.id);
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
  // ① Typeの作成 → ② Modelの作成 → ③ Mutationの作成
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
    addDirector: {
      type: DirectorType,
      args: {
        name: { type: qraphql.GraphQLString },
        age: { type: qraphql.GraphQLInt },
      },
      resolve(parent, args) {
        return new Director({
          name: args.name,
          age: args.age,
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

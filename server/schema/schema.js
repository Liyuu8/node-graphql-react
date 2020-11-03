const qraphql = require('graphql');
const Movie = require('../models/movie');
const Director = require('../models/director');

const MovieType = new qraphql.GraphQLObjectType({
  name: 'Movie',
  fields: () => ({
    id: { type: qraphql.GraphQLID },
    name: { type: qraphql.GraphQLString },
    genre: { type: qraphql.GraphQLString },
    director: {
      type: DirectorType,
      resolve(parent, args) {
        return Director.findById(parent.directorId);
      },
    },
  }),
});

const DirectorType = new qraphql.GraphQLObjectType({
  name: 'Director',
  fields: () => ({
    id: { type: qraphql.GraphQLID },
    name: { type: qraphql.GraphQLString },
    age: { type: qraphql.GraphQLInt },
    movies: {
      type: new qraphql.GraphQLList(MovieType),
      resolve(parent, args) {
        return Movie.find({ directorId: parent.id });
      },
    },
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
    movies: {
      type: new qraphql.GraphQLList(MovieType),
      resolve(parent, args) {
        return Movie.find({});
      },
    },
    directors: {
      type: new qraphql.GraphQLList(DirectorType),
      resolve(parent, args) {
        return Director.find({});
      },
    },
  },
});

// Example:
// {
//   director(id:"5fa0e8463232b2146ad8cf8d") {
//     name
//     age
//     movies {
//       name
//       genre
//     }
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
        directorId: { type: qraphql.GraphQLID },
      },
      resolve(parent, args) {
        return new Movie({
          name: args.name,
          genre: args.genre,
          directorId: args.directorId,
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
    updateMovie: {
      type: MovieType,
      args: {
        id: { type: qraphql.GraphQLNonNull(qraphql.GraphQLID) },
        name: { type: qraphql.GraphQLString },
        genre: { type: qraphql.GraphQLString },
        directorId: { type: qraphql.GraphQLString },
      },
      resolve(parent, args) {
        let updatedMovie = {};
        args.name && (updatedMovie.name = args.name);
        args.genre && (updatedMovie.genre = args.genre);
        args.directorId && (updatedMovie.directorId = args.directorId);
        return Movie.findByIdAndUpdate(args.id, updatedMovie, {
          new: true,
        });
      },
    },
    updateDirector: {
      type: DirectorType,
      args: {
        id: { type: qraphql.GraphQLNonNull(qraphql.GraphQLID) },
        name: { type: qraphql.GraphQLString },
        age: { type: qraphql.GraphQLInt },
      },
      resolve(parent, args) {
        let updatedDirector = {};
        args.name && (updatedDirector.name = args.name);
        args.age && (updatedDirector.age = args.age);
        return Director.findByIdAndUpdate(args.id, updatedDirector, {
          new: true,
        });
      },
    },
    deleteMovie: {
      type: MovieType,
      args: {
        id: { type: qraphql.GraphQLNonNull(qraphql.GraphQLID) },
      },
      resolve(parent, args) {
        return Movie.findByIdAndRemove(args.id);
      },
    },
    deleteDirector: {
      type: DirectorType,
      args: {
        id: { type: qraphql.GraphQLNonNull(qraphql.GraphQLID) },
      },
      resolve(parent, args) {
        return Director.findByIdAndRemove(args.id);
      },
    },
  },
});

// Example:
// mutation {
//   addMovie(name: "君の名は", genre: "アニメ", directorId: "5fa0e8463232b2146ad8cf8d") {
//     name
//     genre
//     director {
//       name
//       age
//     }
//   }
// }

module.exports = new qraphql.GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

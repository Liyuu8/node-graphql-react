import { gql } from 'apollo-boost';

export const MOVIE_LIST = gql`
  {
    movies {
      id
      name
      genre
      director {
        name
      }
    }
  }
`;

export const DIRECTOR_LIST = gql`
  {
    directors {
      id
      name
    }
  }
`;

export const ADD_MOVIE = gql`
  mutation($name: String!, $genre: String!, $directorId: ID!) {
    addMovie(name: $name, genre: $genre, directorId: $directorId) {
      name
      genre
    }
  }
`;

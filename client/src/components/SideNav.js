import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useForm } from 'react-hook-form';
import {
  DIRECTOR_LIST,
  ADD_MOVIE,
  MOVIE_LIST,
  ADD_DIRECTOR,
} from '../queries/queries';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Form,
  FormGroup,
} from 'reactstrap';

const SideNav = () => {
  // https://sbfl.net/blog/2019/08/26/javascript-bracketed-variables/
  const { data } = useQuery(DIRECTOR_LIST);
  const {
    register: registerMovie,
    handleSubmit: handleSubmitMovie,
  } = useForm();
  const {
    register: registerDirector,
    handleSubmit: handleSubmitDirector,
  } = useForm();
  const [addMovie] = useMutation(ADD_MOVIE, {
    refetchQueries: [{ query: MOVIE_LIST }],
    awaitRefetchQueries: true,
  });
  const [addDirector] = useMutation(ADD_DIRECTOR, {
    refetchQueries: [{ query: DIRECTOR_LIST }],
    awaitRefetchQueries: true,
  });
  const onSubmitMovie = ({ movieName, movieGenre, directorId }, e) => {
    addMovie({ variables: { name: movieName, genre: movieGenre, directorId } });
    e.target.reset();
  };
  const onSubmitDirector = ({ directorName, directorAge }, e) => {
    addDirector({
      variables: { name: directorName, age: parseInt(directorAge) },
    });
    e.target.reset();
  };

  return (
    <div>
      {/* 入力フォーム（映画監督） */}
      <Card>
        <CardHeader>映画監督</CardHeader>
        <CardBody>
          <Form onSubmit={handleSubmitDirector(onSubmitDirector)}>
            <FormGroup>
              <input
                type="text"
                name="directorName"
                className="form-control"
                placeholder="監督名"
                ref={registerDirector}
              />
            </FormGroup>
            <FormGroup>
              <input
                type="number"
                name="directorAge"
                className="form-control"
                placeholder="年齢"
                ref={registerDirector}
              />
            </FormGroup>
            <Button color="primary" type="submit">
              追加
            </Button>
          </Form>
        </CardBody>
      </Card>

      {/* 入力フォーム（映画作品） */}
      <Card className="mt-4">
        <CardHeader>映画作品</CardHeader>
        <CardBody>
          <Form onSubmit={handleSubmitMovie(onSubmitMovie)}>
            <FormGroup>
              <input
                type="text"
                name="movieName"
                className="form-control"
                placeholder="タイトル"
                ref={registerMovie}
              />
            </FormGroup>
            <FormGroup>
              <input
                type="text"
                name="movieGenre"
                className="form-control"
                placeholder="ジャンル"
                ref={registerMovie}
              />
            </FormGroup>
            <FormGroup>
              <select
                className="form-control"
                type="select"
                name="directorId"
                ref={registerMovie}
              >
                {data &&
                  data.directors.map(({ id, name }) => (
                    <option key={id} value={id}>
                      {name}
                    </option>
                  ))}
              </select>
            </FormGroup>
            <Button color="primary" type="submit">
              追加
            </Button>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
};

export default SideNav;

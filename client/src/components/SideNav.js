import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useForm } from 'react-hook-form';
import { DIRECTOR_LIST, ADD_MOVIE } from '../queries/queries';
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
  const { register, handleSubmit } = useForm();
  const [addMovie] = useMutation(ADD_MOVIE);
  const onSubmit = ({ movieName, movieGenre, directorId }) =>
    addMovie({ variables: { name: movieName, genre: movieGenre, directorId } });

  return (
    <div>
      {/* TODO: 入力フォーム（映画監督） */}
      <Card>
        <CardHeader>映画監督</CardHeader>
        <CardBody>
          <Form>
            <FormGroup>
              <input
                type="text"
                name="directorName"
                className="form-control"
                placeholder="監督名"
              />
            </FormGroup>
            <FormGroup>
              <input
                type="number"
                name="directorAge"
                className="form-control"
                placeholder="年齢"
              />
            </FormGroup>
            <Button color="primary" type="submit">
              追加
            </Button>
          </Form>
        </CardBody>
      </Card>

      {/* 入力フォーム（映画作品） */}
      {/* TODO: 登録時の再読み込み処理 */}
      <Card className="mt-4">
        <CardHeader>映画作品</CardHeader>
        <CardBody>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
              <input
                type="text"
                name="movieName"
                className="form-control"
                placeholder="タイトル"
                ref={register}
              />
            </FormGroup>
            <FormGroup>
              <input
                type="text"
                name="movieGenre"
                className="form-control"
                placeholder="ジャンル"
                ref={register}
              />
            </FormGroup>
            <FormGroup>
              <select
                className="form-control"
                type="select"
                name="directorId"
                ref={register}
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

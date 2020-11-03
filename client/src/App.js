import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

import { Col, Container, Row } from 'reactstrap';
import Header from './components/Header';
import SideNav from './components/SideNav';
import MovieList from './components/MovieList';

const client = new ApolloClient({
  uri: 'https://node-graphql-react.firebaseapp.com/graphql',
});
const App = () => (
  <div className="App">
    <Header />
    <ApolloProvider client={client}>
      <Container>
        <Row>
          <Col xs={12} sm={4}>
            <SideNav />
          </Col>
          <Col xs={12} sm={8}>
            <MovieList />
          </Col>
        </Row>
      </Container>
    </ApolloProvider>
  </div>
);

export default App;

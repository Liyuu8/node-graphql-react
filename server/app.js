const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
const schema = require('./schema/schema');
const app = express();

require('dotenv').config();
// https://stackoverflow.com/questions/10560241/how-to-use-nodemon-with-env-files
// https://teratail.com/questions/225516
mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => console.log(err ? err : 'Connected to the database')
);

// 接続後のコールバック
mongoose.connection.once('open', function (e) {
  console.log('connected');
});

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

// http://localhost:4000/graphql
app.listen(4000, () => {
  console.log('listening');
});

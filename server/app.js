const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const MongoClient = require('mongodb').MongoClient;
const app = express();

require('dotenv').config();
const client = new MongoClient(process.env.MONGO_URL, {
  useNewUrlParser: true,
});
client.connect((err) => {
  console.log('db connected');
  client.close();
});

app.use('/graphql', graphqlHTTP({}));
app.listen(4000, () => {
  console.log('listening');
});

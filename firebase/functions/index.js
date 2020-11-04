const functions = require('firebase-functions');
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
const schema = require('./schema/schema');
const cors = require('cors');
const app = express();

require('dotenv').config();
mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => console.log(err ? err : 'Connected to the database')
);

app.use(cors());
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

// https://qiita.com/seya/items/225f859d775b31047000
exports.graphqlServer = functions.https.onRequest(app);

// [ERROR]
// Failed to initialize region (action ID: 3a2ff79fbb67455d):
// Error when configuring GCS bucket gcf-sources-618003781941-asia-northeast1
// in project node-graphql-react.
// Cause: The billing account for the owning project is disabled in state absent

// [SOLUTION]
// GCPの対象プロジェクトで請求先アカウントを設定する
// https://console.cloud.google.com/billing

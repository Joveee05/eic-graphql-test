const express = require('express');
const graphqlHTTP = require('express-graphql').graphqlHTTP;
const schema = require('./schema/schema');
const cors = require('cors');
const dotenv = require('dotenv');
const DB = require('./database');
const app = express();

dotenv.config({ path: './config.env' });

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.use(cors());

DB.authenticate()
  .then(() => console.log('Database Connected...'))
  .catch((err) => console.log('Error: ' + err));

app.listen(5000, () => {
  console.log('API running on port 5000');
});

const express = require('express');
const { ApolloServer } = require('apollo-client-express')
const path = require('path');
// const routes = require('./routes');

const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');
const db = require('./config/connection');

const MongoClient = require('mongodb').MongoClient;
const uri = 'mongodb+srv://katheriney:Mexico123@cluster0.gwpon.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

MongoClient.connect(uri, { useNewUrlParser: true }, function(err, client) {
  if (err) {
  } else {
        var collection = client.db('test').collection('devices');
  }
});


const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

server.applyMiddle({ app });


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build.index.html'));
});


// app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`Now listening on localhost: ${PORT}`);
    console.log(`API running on port ${PORT}!`)
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});
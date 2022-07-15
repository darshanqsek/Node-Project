const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';

const client = new MongoClient(url);

async function dbConnect(collectionname) {
    // Use connect method to connect to the server
   let result = await client.connect();
   let db = result.db('node-project');
   return db.collection(collectionname);
  }

  module.exports = dbConnect;
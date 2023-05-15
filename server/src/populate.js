const MongoClient = require('mongodb').MongoClient;
const fs = require('fs');

const MONGO_URL = 'mongodb://mongo:27017';
const DB_NAME = 'insightdb';

const data = JSON.parse(fs.readFileSync('data.json'));

async function populateCollection() {
  let client;
  try {
    client = await MongoClient.connect(MONGO_URL, { useNewUrlParser: true });

    const session = client.startSession();
    const db = client.db(DB_NAME);
    const collection = db.collection('eventsCollection');

    const count = await collection.countDocuments({}, { session });
    if (count > 0) {
      console.log(`Collection already populated with ${count} documents`);
    } else {
      const result = await collection.insertMany(data, { session });
      console.log(`Inserted ${result.insertedCount} documents into the collection`);
    }

    session.endSession();
  } catch (err) {
    console.error(err);
  } finally {
    if (client) {
      client.close();
    }
  }
}

populateCollection();
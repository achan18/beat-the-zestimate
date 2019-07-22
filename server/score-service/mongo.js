const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');


// Connection URL
const url = 'mongodb://localhost:27017/hackweek';

// Database Name
const dbName = 'hackweek';

// Create a new MongoClient
const client = new MongoClient(url, { useNewUrlParser: true });

// Use connect method to connect to the Server
function getLogError(parcelid) {
  var p = new Promise((resolve, reject) => {
    var logerror;
    client.connect(async function (err) {
      assert.equal(null, err);
      console.log('Connected successfully to server');

      const db = client.db();
      // const db = await client.db(dbName);
      // const collection = await db.collection('sales');
      const query = { "parcelid": parseInt(parcelid) };
      const resp = await db.collection('sales').find(query).toArray();
      logerror = resp[0]['logerror'];
      resolve(logerror);
    });
  });

  return p;
}

function getLeaderBoard(parcelid) {
  var p = new Promise((resolve, reject) => {
    client.connect(function (err) {
      const db = client.db(dbName);
      const collection = db.collection('scores');
      let mySort = { score: -1 };
      let query = { "parcelid": parcelid };
      collection.find(query).sort(mySort).toArray(function (error, result) {
        console.log(result);
        resolve(result);
      });
    });

    //    client.close();
  });

  return p;
}

async function insertScore(name, userZestimate, parcelid, score) {

  const connection = await MongoClient.connect(url, { useNewUrlParser: true });
  console.log('Connected successfully to server');
  const db = connection.db(dbName);
  const collection = db.collection('scores');

  await collection.insertOne({
    name: name,
    userZestimate: userZestimate,
    parcelid: parcelid,
    score: score,
    createDate: Date.now()
  });
}

module.exports.getLogError = getLogError;
module.exports.getLeaderBoard = getLeaderBoard;
module.exports.insertScore = insertScore;
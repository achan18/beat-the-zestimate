const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');


// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'zillowdb';

// Create a new MongoClient
const client = new MongoClient(url);

// Use connect method to connect to the Server
function getLogError(parcelid) {
  var p = new Promise((resolve, reject) => {
    var logerror;
    client.connect(function (err) {
      assert.equal(null, err);
      console.log('Connected successfully to server');

      // hard coded parselid
      //    var parselid = 17177301;
      const db = client.db(dbName);
      const collection = db.collection('sales');
      let query = { "parcelid": 17177301 };

      collection.find(query).toArray(function (err, docs) {
        assert.equal(err, null);
        logerror = docs[0]['logerror'];
        resolve(logerror);
      });

      client.close();
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
      //dbo.collection("customers").find().sort(mysort).toArray(function(err, result) {
      collection.find(query).sort(mySort).toArray(function (error, result) {
        console.log(result);
        resolve(result);
      });
    });

    client.close();
  });

  return p;
}

function insertScore(name, userZestimate, parcelid, score) {
  /*   var p = new Promise((resolve, reject) => {
  
      client.connect(function (err) {
        assert.equal(null, err);
        console.log('Connected successfully to server');
        const db = client.db(dbName);
        const collection = db.collection('scores');
  
        collection.insertOne({
          name: name,
          userZestimate: userZestimate,
          parcelid: parcelid,
          score: score,
          createDate: Date.now()
        }, function (err, res) {
          console.log('result:', res);
          if (err) console.log(err);
          resolve(res);
        });
  
        client.close();
  
      });
    });
  
    return p; */
  var p = new Promise((resolve, reject) => {
    var logerror;
    client.connect(function (err) {
      assert.equal(null, err);
      console.log('Connected successfully to server');

      const db = client.db(dbName);
      const collection = db.collection('scores');

      collection.insertOne({
        name: name,
        userZestimate: userZestimate,
        parcelid: parcelid,
        score: score,
        createDate: Date.now()
      }, function (err, result) {
        assert.equal(err, null);
        resolve(result);
      });

      client.close();
    });
  });

  return p;
}

//insertScore('chris', 1000000, 142214, 1000);

module.exports.getLogError = getLogError;
module.exports.getLeaderBoard = getLeaderBoard;
module.exports.insertScore = insertScore;
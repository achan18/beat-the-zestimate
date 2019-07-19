// Lib
const express = require('express');
const app = express();
const request = require('request');
const parser = require('xml2js').parseString;
const util = require('util');

// User-defined Functions
const getLogError = require('./mongo').getLogError;
const getZestimate = require('./zestimate').getZestimate;
const getScore = require('./score').getScore;
const getLeaderBoard = require('./mongo').getLeaderBoard;
const insertScore = require('./mongo').insertScore;

//'http://www.zillow.com/webservice/GetSearchResults.htm?zws-id=X1-ZWz17rpytqj9jf_6le3g&address=2114+Bigelow+Ave&citystatezip=Seattle%2C+WA'
//'http://www.zillow.com/webservice/GetSearchResults.htm?zws-id=X1-ZWz17rpytqj9jf_6le3g&address=279+Bedford+Ave&citystatezip=Brooklyn%2c+NY'

// get zestimate from zpid
// https://www.zillow.com/howto/api/GetZestimate.htm?zws-id=<ZWSID>&zpid=<ZPID>

app.get('/', async function (req, res) {
  res.send('Hi!');
});

app.get('/zestimate', async function (req, res) {
  var zestimate = getZestimate(1);
  res.end({
    zestimate: zestimate
  });
});

app.get('/results', async function (req, res) {

  // getting zestimate from zpid
  var zestimateBody = await getZestimate(12);
  var logError = await getLogError(2);

  parser(zestimateBody, async function (error, result) {
    var zestimateJSON = JSON.parse(JSON.stringify(result));
    var zestimate = zestimateJSON['Zestimate:zestimate']['response'][0]['zestimate'][0]['amount'][0]['_'];
    const salePrice = (10 ** (Math.log10(zestimate) - logError)).toFixed(2);

    // compare the zestimate to the user's Zestimate
    var userZestimate = 1317590.60;

    var scoreObj = getScore(zestimate, userZestimate, salePrice);
    var score = scoreObj.score, beatZestimate = scoreObj.beatZestimate;

    var insertP = await insertScore('chris', 1000000, 134124, 1);
    //    await insertScore(req.body.userName, userZestimate, req.body.parcelid, score);
    //    var leaderBoard = await getLeaderBoard(req.body.parcelid);
    var leaderBoard = null;

    console.log('i hate node');
    res.json({
      zestimate: zestimate,
      userZestimate: userZestimate,
      salePrice: salePrice,
      score: score,
      beatZestimate: beatZestimate,
      leaderBoard: leaderBoard
    });

  });
});

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});

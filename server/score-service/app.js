// Lib
const express = require('express');
const app = express();
const parser = require('xml2js').parseString;
const cors = require('cors');

// User-defined Functions
const getLogError = require('./mongo').getLogError;
const getZestimate = require('./zestimate').getZestimate;
const getScore = require('./score').getScore;
const getLeaderBoard = require('./mongo').getLeaderBoard;
const insertScore = require('./mongo').insertScore;

app.use(cors());

app.get('/results', async function (req, res) {
  // console.log('req: ', req)

  // getting zestimate from zpid
  var zestimateBody = await getZestimate(req.query.zpid);
  var logError = await getLogError(req.query.parcelid);

  parser(zestimateBody, async function (error, result) {
    var zestimateJSON = JSON.parse(JSON.stringify(result));
    var zestimate = zestimateJSON['Zestimate:zestimate']['response'][0]['zestimate'][0]['amount'][0]['_'];
    const salePrice = (10 ** (Math.log10(zestimate) - logError)).toFixed(2);

    // compare the zestimate to the user's Zestimate
    var userZestimate = req.query.userZestimate;

    var scoreObj = getScore(zestimate, userZestimate, salePrice);
    var score = scoreObj.score, beatZestimate = scoreObj.beatZestimate;

    await insertScore(req.query.userName, userZestimate, req.query.parcelid, score);
    var leaderBoard = await getLeaderBoard(req.query.parcelid);

    res.json({
      zestimate: zestimate,
      userZestimate: userZestimate,
      salePrice: salePrice,
      score: score,
      beatZestimate: beatZestimate
    });

  });
});

app.get('/leaderboard', async function (req, res) {
  const leaderBoard = await getLeaderBoard(req.query.parcelid);
  res.json({
    scores: leaderBoard
  });
});

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});

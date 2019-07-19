const csv = require('csv-parser')
const fs = require('fs')
const JSONStream = require('JSONStream');

const csvFileName = 'sample.csv';
const dataFilePath = `./data/${csvFileName}`;

// Returns an object
async function getData() {
    const results = [];

    await new Promise((resolve, reject) => {
        fs.createReadStream(dataFilePath)
         .pipe(csv())
         .on('data', (data) => {
             results.push(data)
         })
        .on('end', () => {
            resolve();
        })
    })
    return results;
}

// Returns a stream
function testData() {
    return fs.createReadStream(dataFilePath)
         .pipe(csv())
         .pipe(JSONStream.stringify())
}

module.exports.getData = getData;
module.exports.testData = testData;
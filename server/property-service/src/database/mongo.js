const {MongoMemoryServer} = require('mongodb-memory-server');
const {MongoClient} = require('mongodb');

let database = null;

async function startDatabase() {
    let mongoDBURL = 'mongodb://localhost:27017/dev';
    const connection = await MongoClient.connect(mongoDBURL, {useNewUrlParser: true});
    database = connection.db();
}

async function getDatabase() {
    if (!database)
        await startDatabase();
    return database;
}

module.exports = {
    getDatabase,
    startDatabase
}
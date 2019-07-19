const {getDatabase} = require('./mongo');

const collectionName = 'smallProperties';

// Inserts all of the properties into the db
async function insertProperty(property) {
    const database = await getDatabase();
    const {insertedId} = await database.collection(collectionName).insertOne(property);
    return insertedId;
}

async function getAllProperties() {
    const database = await getDatabase();
    return database.collection(collectionName).find({}).toArray();
}

async function deleteAllProperties() {
    const database = await getDatabase();
    await database.collection(collectionName).deleteMany();
}

async function findProperty(conditions) {
    const database = await getDatabase();
    return database
        .collection(collectionName)
        .find(conditions)
        .toArray();
}

// @param database an instance of DB
async function count(database) {
    // const database = await getDatabase();
    return database.collection(collectionName).countDocuments();
}

async function getRandomProperty() {
    const database = await getDatabase();
    const totalEntries = await count(database);
    const randNum = Math.floor(Math.random() * totalEntries);
    return database
        .collection(collectionName)
        .find({})
        .limit(1)
        .skip(randNum)
        .toArray()
        .then(resp => resp.length ? resp[0] : {});
}

module.exports = {
    insertProperty,
    getAllProperties,
    deleteAllProperties,
    findProperty,
    count,
    getRandomProperty
}
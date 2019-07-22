const {getDatabase} = require('./mongo');

const collectionName = 'property';

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
    const db = await getDatabase();
    const totalSaleEntries = await db.collection('sales').countDocuments();
    const randNum = Math.floor(Math.random() * totalSaleEntries);
    const randomProperty = await db
                            .collection('sales')
                            .find({})
                            .limit(1)
                            .skip(randNum)
                            .toArray()
                            .then(resp => resp.length ? resp[0] : {});
    return db
            .collection(collectionName)
            .find({'parcelid':randomProperty.parcelid})
            .toArray()
            .then((resp) => resp.length ? resp[0] : {});
}

module.exports = {
    insertProperty,
    getAllProperties,
    deleteAllProperties,
    findProperty,
    count,
    getRandomProperty
}
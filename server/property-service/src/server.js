const Koa = require('koa');
const Router = require('koa-router');
const axios = require('axios');
const cors = require('koa-cors');
const {getData, testData} = require('./parser/parser');

const {startDatabase} = require('./database/mongo');
const {insertProperty, getAllProperties, deleteAllProperties, findProperty, count, getRandomProperty} = require('./database/properties');

const goodProperty = require('../data/goodproperty.json');

const router = new Router();
const app = new Koa();

const portNumber = 8081;

const targetFeatures = [
    'bathroomcnt', 'bedroomcnt', 'finishedsquarefeet12', 'fireplacecnt', 'garagecarcnt', 'hashottuborspa',
    /*'latitude', 'longitude',*/ 'lotsizesquarefeet', 'numberofstories', /*'parcelid',*/ 'poolcnt',
    'roomcnt', 'yearbuilt'
]

const superSecretPw = 'internsrock'
let currentProperty = goodProperty;

router.get("/dev", async ctx => {
    ctx.response.set("content-type", "application/json");
    console.log(ctx.request.query);
    ctx.body = targetFeatures;
});

router.get('/property', async ctx => {
    const adminFlag = ctx.request.query['admin'] ||  false;
    const key = ctx.request.query['key'] || null;

    if (adminFlag && key === superSecretPw) {
        await updateCurrentProperty();
        ctx.response.set("content-type", "application/json");
        ctx.body = currentProperty;
    } else {
        ctx.response.set("content-type", "application/json");
        ctx.body = currentProperty;
    }
})

// router.get("/property", async ctx => {

//     // random property features
//     const oneProperty = await getRandomProperty();
//     ctx.response.set("content-type", "application/json");

//     var property_data = {};
//     for (key in oneProperty) {
//         if (targetFeatures.includes(key)) {
//             property_data[key] = oneProperty[key];
//         }
//     }

//     // address for this property
//     const lat = oneProperty['latitude'] / 1000000.0;
//     const lon = oneProperty['longitude'] / 1000000.0;
//     const address = await getAddress(lat, lon);
//     // const address = {};

//     // zpid for this property
//     const zpid = await getZpid(address);

//     // get image url from realestate api
//     var imageURL = await getImages(zpid);

//     // populate the response
//     var body = {};
//     body['features'] = property_data;
//     body['latitude'] = lat;
//     body['longitude'] = lon;
//     body['parcelid'] = oneProperty['parcelid'];
//     body['address'] = address;
//     body['zpid'] = zpid;
//     body['images'] = imageURL;
//     ctx.body = body;
// });

app.use(cors({
    origin: true,
    methods: ['GET', 'PUT', 'POST'],
}));
app.use(router.routes());

startDatabase().then(async () => {
    // await populateDatabase();
    // updateCurrentProperty();

    app.listen(portNumber, () => {
        console.log(`listening on port ${portNumber}`);
    });
    
});

/*******************************************************************************************************/
/*                                        HELPER FUNCTIONS                                             */
/*******************************************************************************************************/
async function populateDatabase() {
    // parse csv file
    const data = await getData();

    // insert all into database (check if it's already inserted) and filter by insert conditions
    data.forEach(async function (property) {
        let insertCond = false;

        try {
            insertCond = parseInt(property.bathroomcnt, 10) > 0
            && parseInt(property.bedroomcnt, 10) > 0;
        } catch (e) {
            // in case field dne
        }

        if (insertCond) {
            const qres = await findProperty({'parcelid': property.parcelid});
            if (qres == 0) {    // parcelid not in the db
                insertProperty(property);
            }
        }
    });
}

async function getAddress(lat, lon) {
    const googleApiKey = 'AIzaSyCI-HS5B4EwhmmPlZPJmBXad5uZUjGOFHA';
    const googleURL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${googleApiKey}`;

    const resp = await axios(googleURL);
    const target = resp.data.results[0];

    var results = {};
    try {
        results['label'] = target['formatted_address'];

        // populate individually from split
        addrComponents = results['label'].split(',').map(s => {return s.trim()});
        results['street_name'] = addrComponents[0];
        results['city'] = addrComponents[1];
        results['state'] = addrComponents[2].split(' ')[0];
        results['zip_code'] = addrComponents[2].split(' ')[1];
        results['country'] = addrComponents[3];
    } catch (e) {
        console.log(e);
        console.log(target);
    }
    return results;
}

async function getZpid(addrComponents) {
    const zwsId = 'X1-ZWz17rpytqj9jf_6le3g';
    const address = addrComponents['street_name'];
    const cityState = `${addrComponents['city']}, ${addrComponents['state']}`;
    const zillowZpidURL = `http://www.zillow.com/webservice/GetSearchResults.htm?zws-id=${zwsId}&address=${address}&citystatezip=${cityState}`;

    try {
        const resp = await axios(zillowZpidURL);
        const xml = resp.data;
        const beg = "<zpid>";
        const end = "</zpid>";
        const zpid = parseInt(xml.substring(xml.search(beg) + beg.length, xml.search(end)));
        return zpid;
    } catch (e) {
        console.log("error in getZpid(): ", e);
    }
}

async function getImages(zpid) {
    // zpid = 16437114;
    const realestateURL = `https://www.realestate.com/api/details/${zpid}`;

    var results = [];
    try {
        const resp = await axios(realestateURL);
        images = resp.data['payload']['properties'][0]['details']['pictures'];
        images.forEach((obj) => {
            results.push(obj['url'])
        });
    } catch(e) {
        console.log('error in getImages(): ', e);
        return [];
    }
    return results;
}

async function updateCurrentProperty() {
    // random property features
    const oneProperty = await getRandomProperty();
    // ctx.response.set("content-type", "application/json");

    var property_data = {};
    for (key in oneProperty) {
        if (targetFeatures.includes(key)) {
            property_data[key] = oneProperty[key];
        }
    }

    // address for this property
    const lat = oneProperty['latitude'] / 1000000.0;
    const lon = oneProperty['longitude'] / 1000000.0;
    const address = await getAddress(lat, lon);
    // const address = {};

    // zpid for this property
    const zpid = await getZpid(address);

    // get image url from realestate api
    var imageURL = await getImages(zpid);

    // populate the response
    var body = {};
    body['features'] = property_data;
    body['latitude'] = lat;
    body['longitude'] = lon;
    body['parcelid'] = oneProperty['parcelid'];
    body['address'] = address;
    body['zpid'] = zpid;
    body['images'] = imageURL;

    currentProperty = body;
}
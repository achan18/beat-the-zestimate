const axios = require('axios');
const parser = require('xml2js').parseString;

async function getZestimate(zpid) {
    var resp = await axios.get(`http://www.zillow.com/webservice/GetZestimate.htm?zws-id=X1-ZWz17rpytqj9jf_6le3g&zpid=${zpid}`);
    return resp.data;
}

module.exports.getZestimate = getZestimate;
const NodeGeocoder = require("node-geocoder");
const dotenv = require("dotenv");

//load env vars
dotenv.config({ path: "./config/config.env" });
//console.log(process.env.GEOCODER_PROVIDER);
const options = {
  provider: process.env.GEOCODER_PROVIDER,
  apiKey: process.env.GEOCODER_API_KEY,
  httpAdapter: "https",
  formatter: null, // 'gpx', 'string', ...
};

const geocoder = NodeGeocoder(options);
module.exports = geocoder;

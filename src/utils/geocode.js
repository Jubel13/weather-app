const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoianViZWwxMyIsImEiOiJja3ZnaXh3M2RhczNvMm90OTgxNGR5b3F5In0.6phtX2O6phL7cJPoLZvLqw&limit=1";

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Unable to connect to the server!", undefined);
    } else if (body.features.length === 0) {
      callback("Location not found, please enter another!");
    } else {
      callback(undefined, {
        longitude: body.features[0].center[0],
        latitude: body.features[0].center[1],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;

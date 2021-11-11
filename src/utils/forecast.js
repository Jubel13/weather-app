const request = require("request");

const forecast = (lat, long, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=6ffa2e47df625daaa06eb03fb84fb279&query=" +
    lat +
    "," +
    long +
    "&units=f";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to Connect to the Server!", undefined);
    } else if (body.error) {
      callback(body.error.info, undefined);
    } else {
      callback(
        undefined,
        body.current.weather_descriptions[0] +
          ". It is currently " +
          body.current.temperature +
          " degree, but it feels like " +
          body.current.feelslike +
          " degrees. The local time is " +
          body.location.localtime +
          "."
      );
    }
  });
};

module.exports = forecast;

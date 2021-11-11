const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

// Define path for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and view location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Jubel Sinaga",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Jubel Sinaga",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    message: "This is a help page, please contact me to more information",
    name: "Jubel Sinaga",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Please provide an address",
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({
          error,
        });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({
            error,
          });
        }
        res.send({
          location,
          description: forecastData,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "Please provide a search term",
    });
  }
  console.log(req.query);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404Pages", {
    title: "404 Help",
    name: "Jubel Sinaga",
    message: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404Pages", {
    title: "404-Not Found",
    name: "Jubel Sinaga",
    message: "Page not found",
  });
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});

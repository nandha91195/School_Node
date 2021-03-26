const express = require("express");
const bodyParser = require("body-parser");
const dbConfig = require("./config/config");
const mongoose = require("mongoose");
const config = require("./config/config");

mongoose.Promise = global.Promise;

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


// parse requests of content-type - application/json
app.use(bodyParser.json());


// define a simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to St.Joseph hr sec School" });
});


// api for routes

const api = require('./routes/v1');

app.use('/v1', api);


// Connecting to the database
mongoose
  .connect(config.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true 
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });

  // listen for requests

  app.listen(config.PORT, () => {
    console.log(`Server is listening on port ${config.PORT}`);
  });
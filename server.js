'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser'); //Required to parse data coming from POST requests
const cors = require('cors');

const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');
const mongo = require('mongodb');

const port = process.env.PORT;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: 'true' })); // parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse requests of content-type - application/json

app.use('/public', express.static(process.cwd() + '/public'));

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, { 
  useNewUrlParser: true 
}).then( () => {
  console.log("Successfully connected to database");
}).catch(err => {
  console.log("Failed to connect to database. Exiting now. Error: ", err);
  process.exit();
});

require("./app/routes/url.routes.js")(app);

//Since routes are sequentially executed, if a request gets this far down, it should trigger a 404 error as no routing is found for that request.
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  res.send({ "error":"invalid URL" });
});

app.listen(process.env.PORT, () => {
  console.log('Node.js listening on port: ' + port);
});
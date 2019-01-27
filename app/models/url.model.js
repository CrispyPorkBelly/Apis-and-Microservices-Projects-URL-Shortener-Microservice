const mongoose = require('mongoose');
const shortid = require('shortid'); //to generate short web urls

const UrlSchema = mongoose.Schema({
  "providedUrl": {type: String, required: true},
  "shortUrl": {"type": String, "default": shortid.generate} 
});

module.exports = mongoose.model("Url", UrlSchema);
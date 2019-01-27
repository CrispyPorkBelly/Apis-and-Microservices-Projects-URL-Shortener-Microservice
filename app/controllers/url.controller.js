const Url = require("../models/url.model.js");

// Create and save a new Url
exports.create = (req, res) => {
  
  //capture long url submitted by user
  const originalUrl = req.body.url;
  
  //ensures submission is not blank first
  if(!originalUrl) { 
   return res.status(400).send({
     message: "Link cannot be empty"
   });
  }
  
  //Create new Url shortcut
  const newUrl = new Url({
    "providedUrl": originalUrl
  })
  
  //Save newly created url in collection
  newUrl.save()
  .then(data => {
   res.send({ "original_url": data.providedUrl, "short_url": data.shortUrl }); 
   console.log("Saved new record");
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Error has occured in saving new url"
    });
  });
  
};

// Retrieve and return all urls from the database.
exports.findAll = (req, res) => {
  Url.find()
  .then(urls => {
   res.send(urls); 
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Error has occured in retrieving all urls"
    });
  });
};

// Find a single note with a urlId
exports.findOne = (req, res) => {
  //store the request short url
  const shortUrl = req.params.url;
  
  Url.findOne({ shortUrl: shortUrl })
  .then(url => {
    
    //return an error if nothing is found
    if(!url) {
      return res.status(404).send({ 
        message: "No corresponding website found with shortcut" + shortUrl  
      });
    }
    
    //if a record is found
    // res.send(url);
    console.log(url);
    return res.redirect(url.providedUrl);
    
  }).catch(err => {
    return res.status(500).send({
      message: "Error in retrieving record with shortshortcut: " + shortUrl
    });
  });
}
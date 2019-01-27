module.exports = (app) => {
  
  const urls = require("../controllers/url.controller.js");
  
  //Default homepage provided by FCC
  app.get('/', (req, res) => {
    res.sendFile(process.cwd() + '/views/index.html');
  });
  
  //collect form data posted to api/shorturl/new
  app.post("/api/shorturl/new", urls.create); 

  //Create function to redirect based on shortcut entered
  app.get("/api/shorturl/:url", urls.findOne);

};
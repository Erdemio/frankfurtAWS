
var MongoClient = require('mongodb').MongoClient;
var url = process.env.LINK;
const express = require("express");
const app = express();
var port = process.env.PORT || 80;
const router = express.Router();
var cors = require('cors')

app.use("/", router);

app.listen(port, function() {
  console.log("Server is running on Port: " + port);
});

app.get('/word/:word', cors(), function (req, res) {
  let reqWord = req.params['word'];

  if(reqWord==null || reqWord=="")
  {

  }

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("dict");//database name
    var query = { word: new RegExp('^' + reqWord) };
    dbo.collection("wordList").find(query).toArray(function(err, result) {
      if (err) throw err;
      //console.log(result);
      res.json(result);
      db.close();
    });
  });
})

app.get('/insert/:key/:word/:meaning/:synonym/:antonym/:otherForms', cors(), function (req, res) {
  if(req.params['key']=="777eee3"){
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("dict");
      var data = {
                "word": req.params['word'],
                "meaning": req.params['meaning'],
                "synonym": req.params['synonym'],
                "antonym": req.params['antonym'],
                "otherForms": req.params['otherForms']
        };
      dbo.collection("wordList").insertOne(data, function(err, res) {
        if (err) throw err;
        console.log("done.");
        res.write("done.");
        db.close();
      });
    });
  }else{
    res.write("error.");
  }
})

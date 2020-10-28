
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

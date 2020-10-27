
var MongoClient = require('mongodb').MongoClient;
var url = process.env.conString;
const express = require("express");
const app = express();
var port = process.env.PORT || 80;
const router = express.Router();

app.use("/", router);

app.listen(port, function() {
  console.log("Server is running on Port: " + port);
});

app.get('/word/:word', function (req, res) {
  let gelen = req.params['word'];
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("dict");
    var query = { word: new RegExp(req.params.data) };
    dbo.collection("wordList").find(query).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      res.send(result);
      db.close();
    });
  });
})

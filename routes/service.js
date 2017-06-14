var express = require('express');
var router = express.Router();
var db;
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
// Connection URL
var url = 'mongodb://localhost:27017/list';
// Use connect method to connect to the server
MongoClient.connect(url, function(err, database) {
  if (err) {
      console.log("NOT Connected to Database");
  } else {
      console.log("Connected successfully to Database");
      db = database;
      // console.log(db);
  }
});
/* GET home page. */
router.get('/add', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  // console.log(db);
  db.collection('inventory').insertOne({
  item: "canvas",
  qty: 100,
  tags: ["cotton"],
  size: { h: 28, w: 35.5, uom: "cm" }
})
.then(function(result) {
  res.send("success");
  console.log(result);
})
});
/* GET home page. */
router.get('/retrive', function(req, res, next) {
  // var cursor = db.collection('inventory').find({"_id":"590aad7f64988021e8404ad8"});

// Use connect method to connect to the Server
var col = db.collection('find');
// Insert a single document
col.insertMany([{a:1}, {a:1}, {a:1}], function(err, r) {
  assert.equal(null, err);
  assert.equal(3, r.insertedCount);

  // Get first two documents that match the query
  col.find({a:1}).limit(2).toArray(function(err, docs) {
    assert.equal(null, err);
    assert.equal(2, docs.length);
    res.send(docs);
    // db.close();
  });
});

  // console.log(cursor);
});
module.exports = router;

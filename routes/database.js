var express = require('express');
var router = express.Router();
var dbConnector = require('../databaseConnector.js');
var jade = require('jade');
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('database');
});

router.get('/showData', function(req, res, next){
  dbConnector.selectAll(function(json){
    console.log(json);
    fs.readFile('views/table.jade', 'utf8', function (err, data) {
      if (err) throw err;     
      var fn = jade.compile(data, {filename: 'views/table.jade'});
      var html = fn(json);
      console.log(html);
      res.send(html);
    });
  });
});

router.get('/exists', function(req, res, next){
  var result = {};
  dbConnector.databaseExists((dbExists) =>{
    result.databaseExists = dbExists;
    console.log(`Checking if db is created ${dbExists} and result: ${JSON.stringify(result)}`);
    if(dbExists){
      dbConnector.tableExists((tblExists) =>{
        result.tableExists = tblExists;
        console.log(`Checking if table is created ${tblExists} and result: ${JSON.stringify(result)}`);
        if(tblExists){
        dbConnector.dataExists((dtExists) =>{
          result.dataExists = dtExists;
          console.log(`Checking if data is created ${dtExists} and result: ${JSON.stringify(result)}`);
          res.send(JSON.stringify(result));
        });
        }else {res.send(result)}
      });
    }else {
      console.log(JSON.stringify(result));
      res.send(JSON.stringify(result))}
  });
});

module.exports = router;

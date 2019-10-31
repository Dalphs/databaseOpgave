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

module.exports = router;

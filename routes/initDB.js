var express = require('express');
var router = express.Router();
var dbConnector = require('../databaseConnector.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  var dbName = 'nodedb';
  dbConnector.createDatabase(dbName);
  res.end();
});

router.get('/initTable', function(req, res, next){
  var dbSetup = {databaseName: 'nodedb',
  tableName: 'persons',
  columnNames: ['name', 'height', 'age']};
  dbConnector.initTable(dbSetup);
  res.end;
});

router.get('/createData', function(req, res, next){
  var dbSetup = {databaseName: 'nodedb',
  tableName: 'persons',
  columnNames: ['name', 'height', 'age']};
  dbConnector.createDummyData(dbSetup);
  res.end();
})



module.exports = router;

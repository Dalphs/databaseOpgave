var express = require('express');
var router = express.Router();
var dbConnector = require('../databaseConnector');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('api', {requestType: ['GET', 'GET','PUT', 'POST', 'DELETE'], requestURL: ['persons', 'persons/:id', 'persons', 'persons/:id', 'persons/:id']});
});

router.get('/persons',(req, res, next) =>{
  dbConnector.selectAll((result) => {
    res.send(JSON.stringify(result.objects));
  });
});

router.post('/persons', (req, res, next) =>{
  var json = req.body;
  dbConnector.insert(json);
  res.send("Object inserted in database");
});

router.get('/persons/:id', (req, res, next) =>{
  var id = req.params.id;
  dbConnector.selectByID(id, (result) =>{
    res.send(JSON.stringify(result));
  });
});

router.put('/persons/:id', (req, res) =>{
  var id = req.params.id;
  var json = req.body;
  json.id = id;
  dbConnector.updateByID(json, (result) =>{
    res.send("Object updated");
  });
});

router.delete('/persons/:id', (req, res) =>{
  console.log("HER");
  var id = req.params.id;
  dbConnector.deleteByID(id, (result) =>{
    res.send(JSON.stringify(result));
  });
});



module.exports = router;
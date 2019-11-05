var mysql = require('mysql');
var dbSetup = {
  host: "localhost",
  user: 'root',
  password: "root",
  charset: "utf8mb4",
  multipleStatements: true
}
var dbSetupName = 'nsa_mission';
var dbTableName = 'targets';

exports.createDatabase = function(dbInfo){
    console.log(dbInfo);
    initDatabase(dbInfo);
}

initDatabase = (dbName) =>{
  var config = dbSetup;
  var con = mysql.createConnection(config);
      
      con.connect(function(err){
        if(err)throw err;
        console.log("Connected to Database");
      });
      var query = "DROP DATABASE IF EXISTS " + dbSetupName + ";";
      query += "CREATE DATABASE " + dbSetupName + ";"; 
        con.query(query, function(err, result){
          if (err) throw err;
        });
        con.end();
}

exports.initTable = (dbInfo) =>{
    var config = dbSetup;
    config.database = dbSetupName;
    var con = mysql.createConnection(config);
      
      con.connect(function(err){
        if(err)throw err;
        console.log("Connected to Database: " + dbSetupName);
      });
      var query = "CREATE TABLE " + dbTableName + " (id int NOT NULL AUTO_INCREMENT,";
      for (i= 0; i < dbInfo.columnNames.length; i++){
          query += dbInfo.columnNames[i] + " VARCHAR(255)";
          if(i != dbInfo.columnNames.length - 1){
              query += ", " ;
          }
      }
      query += ", PRIMARY KEY (id));"
      console.log('Query: ' + query);
        con.query(query, function(err, result){
          if (err) throw err;
          console.log(result);
        });
        con.end();
}

exports.createDummyData = (dbInfo) =>{
  var config = dbSetup;
  config.database = dbSetupName;
  var con = mysql.createConnection(config);
      
    con.connect(function(err){
      if(err)throw err;
    });

    var dummyData = {firstname: ['Simon', 'Anders', 'Thomas'], lastname: ['Dalby', 'Cosby', 'Nielsen']};
    for (i = 0; i < 3; i++){
        for(j = 0; j < 3; j++){
            var name = dummyData.firstname[i] + " " + dummyData.lastname[j];
            var height = (Math.ceil(Math.random() * 20) + 170).toString(10) + "cm";
            var age = (Math.ceil(Math.random() * 10) + 20).toString(10);

            var query = `INSERT INTO ${dbTableName} (${dbInfo.columnNames[0]}, ${dbInfo.columnNames[1]}, ${dbInfo.columnNames[2]}, ${dbInfo.columnNames[3]})
             VALUES ("${name}", "${height}", "${age}", "Alive");`;
            console.log(query);

            con.query(query, function(err, result){
                if (err) throw err;
            });
        }
    }
    con.close;
}

exports.selectByID = (id, fn) =>{
  var config = dbSetup;
  config.database = dbSetupName;
  var con = mysql.createConnection(config);
  
  con.connect(function(err){
    if(err)throw err;
  });

  var query = `SELECT * FROM ${dbTableName} WHERE id=${id}`;
  console.log(query);
  con.query(query, function(err, result){
    if (err) throw err;
    var resultJSON = result;
    con.end();
    console.log(resultJSON);
    fn(resultJSON);
  });
}

exports.selectAll = (fn) =>{
  var config = dbSetup;
  config.database = dbSetupName;
  var con = mysql.createConnection(config);
  
  con.connect(function(err){
    if(err)throw err;
  });

  var resultJSON = {titles: [], objects: []};

  var query = `SHOW columns FROM ${dbTableName};`;
  query += `SELECT * FROM ${dbTableName};`;
  con.query(query, function(err, result){
    if (err) throw err;
    for (i = 0; i < result[0].length; i++){
      resultJSON.titles.push(result[0][i].Field);
    }
    resultJSON.objects = result[1];
    con.end();
    fn(resultJSON);
  });
}

exports.updateByID = (json, fn) =>{
  var config = dbSetup;
  config.database = dbSetupName;
  var con = mysql.createConnection(config);
  
  con.connect(function(err){
    if(err)throw err;
    console.log("Connected to Database: nodedb");
  });
  var object = 
  console.log("json in UpdateByID: " + json.name);
  var query = `UPDATE ${dbTableName} SET name="${json.name}", height="${json.height}", age="${json.age}" WHERE id=${json.id};`;
  query += `SELECT * FROM ${dbTableName} WHERE id=${json.id};`;
  console.log(query);
  con.query(query, function(err, result){
    if (err) throw err;
    var resultJSON = result[1];
    con.end();
    console.log(resultJSON);
    fn(resultJSON);
  });
}

exports.insert = (json, fn) =>{
  var config = dbSetup;
  config.database = dbSetupName;
  var con = mysql.createConnection(config);
  
  con.connect(function(err){
    if(err)throw err;
    console.log("Connected to Database: nodedb");
  });

  var query = `INSERT INTO ${dbTableName} (name, height, age) VALUES ("${json.name}", "${json.height}", "${json.age}");`

  con.query(query, function(err, result){
    if (err) throw err;
    con.end();
  });
}

exports.deleteByID = (id, fn) =>{
  var config = dbSetup;
  config.database = dbSetupName;
  var con = mysql.createConnection(config);
  
  con.connect(function(err){
    if(err)throw err;
    console.log("Connected to Database: nodedb");
  });

  var query = `DELETE FROM ${dbTableName} WHERE id=${id};`

  con.query(query, function(err, result){
    if (err) throw err;
    con.end();
    fn(result);
  });
}

exports.databaseExists = (fn) =>{
  var con = mysql.createConnection(dbSetup);
  
  
  con.connect(function(err){if(err) throw err});
  
  var query = `SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = '${dbSetupName}'`;

  con.query(query, function(err, result){
    if (err) throw err;
    var json = result;
    fn(json.length != 0);
    con.end();
  });
}

exports.tableExists = (fn) =>{
  var config = dbSetup;
  config.database = dbSetupName;
  var con = mysql.createConnection(config);
  
  con.connect(function(err){
    if(err)throw err;
  });

  var query = `SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = '${dbTableName}'`;

  con.query(query, function(err, result){
    if (err) throw err;
    var json = result;
    console.log(json.length != 0);
    fn(json.length != 0);
    con.end();
  });
}

exports.dataExists = (fn) =>{
  var config = dbSetup;
  config.database = dbSetupName;
  var con = mysql.createConnection(config);
  
  con.connect(function(err){
    if(err)throw err;
  });

  var query = `SELECT * FROM ${dbTableName} LIMIT 0, 1`;

  con.query(query, function(err, result){
    if (err) throw err;
    var json = result;
    console.log(json.length != 0);
    fn(json.length != 0);
    con.end();
  });
}
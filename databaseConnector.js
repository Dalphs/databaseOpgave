var mysql = require('mysql');

exports.createDatabase = function(dbInfo){
    console.log(dbInfo);
    initDatabase(dbInfo);
}

initDatabase = (dbName) =>{
    var con = mysql.createConnection({
        host: "localhost",
        user: 'root',
        password: "root",
        charset: "utf8mb4",
        multipleStatements: true
      });
      
      con.connect(function(err){
        if(err)throw err;
        console.log("Connected to Database");
      });
      var query = "DROP DATABASE IF EXISTS " + dbName + ";";
      query += "CREATE DATABASE " + dbName + ";"; 
        con.query(query, function(err, result){
          if (err) throw err;
          console.log(result);
        });
        con.end();
}

exports.initTable = (dbInfo) =>{
    var con = mysql.createConnection({
        host: "localhost",
        user: 'root',
        password: "root",
        database: dbInfo.databaseName,
        charset: "utf8mb4",
        multipleStatements: true
      });
      
      con.connect(function(err){
        if(err)throw err;
        console.log("Connected to Database: " + dbInfo.databaseName);
      });
      var query = "CREATE TABLE " + dbInfo.tableName + " (";
      for (i= 0; i < dbInfo.columnNames.length; i++){
          query += dbInfo.columnNames[i] + " VARCHAR(255)";
          if(i != dbInfo.columnNames.length - 1){
              query += ", " ;
          }
      }
      query += ");"
      console.log('Query: ' + query);
        con.query(query, function(err, result){
          if (err) throw err;
          console.log(result);
        });
        con.end();
}

exports.createDummyData = (dbInfo) =>{
    var con = mysql.createConnection({
        host: "localhost",
        user: 'root',
        password: "root",
        database: dbInfo.databaseName,
        charset: "utf8mb4",
        multipleStatements: true
      });
      
      con.connect(function(err){
        if(err)throw err;
        console.log("Connected to Database: " + dbInfo.databaseName);
      });

    var dummyData = {firstname: ['Simon', 'Anders', 'Thomas'], lastname: ['Dalby', 'Cosby', 'Nielsen']};
    for (i = 0; i < 3; i++){
        for(j = 0; j < 3; j++){
            var name = dummyData.firstname[i] + " " + dummyData.lastname[j];
            var height = (Math.ceil(Math.random() * 20) + 170).toString(10) + "cm";
            var age = (Math.ceil(Math.random() * 10) + 20).toString(10);

            var query = `INSERT INTO ${dbInfo.tableName} (${dbInfo.columnNames[0]}, ${dbInfo.columnNames[1]}, ${dbInfo.columnNames[2]})
             VALUES ("${name}", "${height}", "${age}");`;
            console.log(query);

            con.query(query, function(err, result){
                if (err) throw err;
            });
        }
    }
    con.close;
}

exports.selectAll = (fn) =>{
  var con = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: "root",
    database: "nodedb",
    charset: "utf8mb4",
    multipleStatements: true
  });
  
  con.connect(function(err){
    if(err)throw err;
    console.log("Connected to Database: nodedb");
  });

  var resultJSON = {titles: [], objects: []};

  var query = "SHOW columns FROM persons;";
  query += "SELECT * FROM persons;";
  con.query(query, function(err, result){
    if (err) throw err;
    for (i = 0; i < result[0].length; i++){
      resultJSON.titles.push(result[0][i].Field);
    }
    resultJSON.objects = result[1];
    fn(resultJSON);
  });
}
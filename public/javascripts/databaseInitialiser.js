var tableContainer = document.getElementById('table-container');

//Using AJAX to call actions on database when button is clicked
var createDatabase = function(){
    var req = new XMLHttpRequest();
    req.open('GET', '/database/initDB');
    req.send();
  };

var createTable = function(){
    var req = new XMLHttpRequest();
    req.open('GET', '/database/initDB/initTable');
    req.send();
}

var insertDummyData = function(){
    var req = new XMLHttpRequest();
    req.open('GET', '/database/initDB/createData');
    req.send();
}

var showData = () =>{
    var req = new XMLHttpRequest();
    req.open('GET', '/database/showData');
    req.onload = () =>{
        console.log('responsetext: ' + req.responseText);
        tableContainer.insertAdjacentHTML('beforeend', req.responseText);
    }
    req.send();
}
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
};

var insertDummyData = function(){
    var req = new XMLHttpRequest();
    req.open('GET', '/database/initDB/createData');
    req.send();
};

var showData = () =>{
    var req = new XMLHttpRequest();
    req.open('GET', '/database/showData');
    req.onload = () =>{
        tableContainer.innerHTML = "";
        console.log('responsetext: ' + req.responseText);
        tableContainer.insertAdjacentHTML('beforeend', req.responseText);
    }
    req.send();
};
var id = 1;
sequenceAction = (id) =>{
    switch(id){
        case 1:
            createDatabase();
        break;
        case 2:
            createTable();
        break;
        case 3:
            insertDummyData();
        break;
    }
    spinImage(id);
    id++;
};

spinImage = (idi) =>{
    var img = document.getElementById(`spin-image${idi}`);
        img.classList.add('continuous-rotation');
        var deactivate = document.getElementById(`sequence-button${idi}`);
        deactivate.onclick = () =>{console.log("Button disabled")};
        idi++;
        if(idi < 4){
            var activate = document.getElementById(`sequence-button${idi}`);
            activate.onclick = () => {sequenceAction(idi);};
        }else{
            var buttonContainer = document.getElementById('data-button-container');
            buttonContainer.innerHTML = "<a onclick='showData();' class='sequence-button'>View Targets</a>";
        }
}

dbExists = () =>{
    var req = new XMLHttpRequest();
    req.open('GET', '/database/exists');
    req.onload = () =>{
        
        var res = JSON.parse(req.response);
        console.log('Response from /exists' + req.response);
        if(res.databaseExists){
        spinImage(1);
        id++;
        }
        if(res.tableExists){
        spinImage(2);
        id++;}
        if(res.dataExists){
        spinImage(3);}
    };
    req.send();
};
dbExists();

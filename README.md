# Databaseopgave

## Setting up database
  
To initialise the database you need to have a MYsql server running.

You will need to change the password and username in databaseConnector.js file to match your servers


    var dbSetup = {
      host: "localhost",
      user: 'your_username',
      password: "your_password",
      charset: "utf8mb4",
      multipleStatements: true
    }
    var dbSetupName = 'nsa_mission';
    var dbTableName = 'targets';
    
If you're server is running you need to go to localhost:3000, which will take you to localhost:3000/database

You will need to figure out the correct initiation sequence to create the database, create the table and insert mock data.

![Front page](https://i.imgur.com/SSmOLvx.png "Front page")

When all the wheels are turning a button will appear, which you can use to display the data from the database

![Front page with data](https://i.imgur.com/200mt8t.png "Front page with data")

## API

To see the API options go to localhost:3000/api

![API page](https://i.imgur.com/QST0CMj.png "API page")

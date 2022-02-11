const inquirer = require('inquirer');
//const db = require('./db/connection');
const consoleTable = require('console.table');
const mysql = require('mysql2');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "company_db"
  });
  
  // connect to the mysql server and sql database
  connection.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    homeScreen();
  });

  const homeScreen = () => {
      inquirer
        .prompt({
            type: 'list',
            name: 'tasks',
            message: 'What would you like to do?',
            choices: [
                "View Departments",
                "View Roles",
                "View All Employees",
                "Add a Department",
                "Add a Role",
                "Add an Employee",
                "Update an Employee Role"
            ] 
        });
  };
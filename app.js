const inquirer = require('inquirer');
//const db = require('./db/connection');
const cTable = require('console.table');
const mysql = require('mysql2');
const express = require('express');


const PORT = process.env.PORT || 3306;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'company_db'
    },
    console.log(`Connected to the company_db database at ${PORT}.`)
);

  
  // connect to the mysql server and sql database
  db.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    homeScreen();
  });

  const homeScreen = () => {
    console.log('Welcome to the Company Database') 
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
                "Delete an Employee"
            ] 
        })
        .then(answer => {
            switch(answer.tasks){
                case "View Departments":
                    viewDepartments();
                    break;
                
                case "View Roles":
                    viewRoles();
                    break;
                case "View All Employees":
                    viewEmployees();
                    break;
                case "Add a Department":
                    addDepartment();
                    break;
                case "Add a Role":
                    addRole();
                    break;
                case "Add an Employee":
                    addEmployee();
                    break;
                case "Delete an Employee":
                    deleteEmployee();
                    break;
            }
        })
  };

 
 viewDepartments = () => {
     db.query("SELECT * FROM department;", (err, res) => {
         if (err) throw err;
         console.table(res);
         homeScreen();
     })
 };

 viewRoles = () => {
     db.query("SELECT role.title AS title, role.salary AS salary, department.name AS department FROM role JOIN department ON role.department_id = department.id;", (err, res) => {
         if(err) throw err;
         console.table(res);
         homeScreen();
     })
 };

 viewEmployees = () => {
     db.query("SELECT employee.first_name, employee.last_name, role.title, role.salary, CONCAT (m.first_name, ' ', m.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN employee m ON m.id = employee.manager_id;", (err, res) => {
         if(err) throw err;
         console.table(res);
         homeScreen();
     })
 };

 addDepartment = () => {
     inquirer.prompt({
         type: 'input',
         message: 'What is the name of the department?',
         name: 'depName'
     }) .then(function(answer) {
         db.query(`INSERT INTO department (name) VALUES (${answer.depName})`, (err, res) => {
             if(err) throw err;
             console.log(res);
             homeScreen();
         })
     })
 };

 addRole = () => {
     console.log("1 = Accounting, 2 = Marketing, 3 = HR, 4 = Company Wide")
     inquirer.prompt([
         {
             type: 'input',
             name: 'roleTitle',
             message: 'What is the role title?'
         },
         {
             type: 'input',
             name: 'roleSalary',
             message: 'What is the salary of the position?'
         },
         {
             type: 'list',
             name: 'departmentID',
             message: 'Please choose the Department ID associated with the role. Refer to console log above.',
             choices: [
                 1,
                 2,
                 3,
                 4
             ]
         }
     ]) .then (function(answer) {
         db.query(`INSERT INTO role (title, salary, department_id) VALUES ('${answer.roleTitle}', '${answer.roleSalary}', ${answer.departmentID})`, (err, res) => {
             if (err) throw err;
             console.log(res);
             homeScreen();
         })
     })
 };

 addEmployee = () => {
     console.log("Managers: 1 = Gandalf, 2 = Aragorn, 5 = Frodo")
     inquirer.prompt([
         {
             type: 'input',
             name: 'firstName',
             message: 'What is the first name?'
         },
         {
             type: 'input',
             name: 'lastName',
             message: 'What is the last name?'
         },
         {
             type: 'input',
             name: 'roleID',
             message: 'What is the role ID?'
         },
         {
             type: 'list',
             name: 'managerID',
             message: 'What is the manager ID?',
             choices: [
                 1,
                 2,
                 5
             ]
         }
     ]) .then(function(answer) {
         db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${answer.firstName}', '${answer.lastName}', '${answer.roleID}', ${answer.managerID})`, (err, res) => {
             if (err) throw err;
             console.log(res);
             homeScreen();
         })
     })
 };

 function deleteEmployee() {
    inquirer.prompt({
        type: 'input',
        name: 'employeeOp',
        message: 'Which employee do you want to remove?'
    }).then(function(answer) {
        db.query(`DELETE FROM employee WHERE first_name=${answer.employeeOp}`, (err, res) => {
            if (err) throw err;
            console.table(res);
            homeScreen();
        });
    })
 }

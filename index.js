const { read } = require('fs/promises');
const mysql = require('mysql');
const cTable = require('console.table');
var inquirer = require('inquirer');

//connection to the mysql,port, password, and database:
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user:'root',
    user:'root',
    password:'Welcome1',
    database: 'employeelist',
});

const readProducts = () => {
    console.log('Selecting all Employees...');
    connection.query('Select * from employee', (err, res) => {
        if(err) throw err;

        console.table(res);
        connection.end();
        
    });
};



function displayPrompt() {
    inquirer
      .prompt([
        {
          type: 'list',
          message: "What would  you like to do?",
          name: 'todoList',
          choices: ["View All Employees",
           "View All Employees By Department", 
          "View All Employees By Manager",
          "Add Employee",
          "Add Employee",
          "Remove Employee",
          "Update Employee Role",
          "Update Employee Manager",
          "View All Roles",
          "Add Role",
          "Remove Role",
          "View All Department",
          "Add Department",
          "Remove Department",
          "Quit",
        ],
          validate: (value) => { if (value) { return true } else { return " I need a value to continue" } },
  
        }])
      .then(function ({ todoList }) {
        if (todoList === "View All Employees") {readProducts(); }
        else if(todoList === "Quit"){  console.log("Goodbye");}
        else{
            console.log("An error has occured!");
        }
    });

}
displayPrompt();

// const { read } = require('fs/promises');
const mysql = require('mysql');
const cTable = require('console.table');
var inquirer = require('inquirer');
const util = require('util');
//connection to the mysql,port, password, and database:
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  user: 'root',
  password: 'Welcome1',
  database: 'employeelist',
});
connection.query = util.promisify(connection.query);
//View All Employees
const readEmployees = async () => {
  console.log('Selecting all Employees...');
  const res = await connection.query('SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(e.first_name,e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id');

  console.table(res)
  displayPrompt();
};



// "View All Employees By Department", 
const readEmployeesBYDepart = async () => {
  console.log('Selecting all Employees By Department');
  const res = await connection.query("SELECT employee.first_name, employee.last_name, department.name AS Department FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id");
  // (err, res) => {
  //   if (err) throw err;

  console.table(res);
  displayPrompt();

};

// "View All Employees By Manager"
const readEmployeesBYManager = async () => {
  console.log('Selecting all Employees By Manager');
  const res = await connection.query("SELECT employee.first_name, employee.last_name, CONCAT(e.first_name,e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id");
  // (err, res) => {
  //     if(err) throw err;

  console.table(res);
  displayPrompt();

};
//Select role
var roleArray = [];
function inputRole() {
  connection.query("Select * from role", function (err, res) {
    if (err) throw err
    for (var i = 0; i < res.length; i++) {
      roleArray.push(res[i].title);
      // console.table(res.title);
    }
  })
  return roleArray;
};
//Select a manager
var manager = [];
function choiceManger() {
  connection.query("Select first_name, last_name from employee WHERE manager_id is not NUll", function (err, res) {
    if (err) throw err
    for (var i = 0; i < res.length; i++) {
      manager.push(res[i].first_name);
    }
  })
  return manager;
}
// "Add Employee"
function addEmployee() {
  inquirer.prompt([
    {
      name: "firstName",
      type: "input",
      message: "Please enter the first name of the employee:"
    },
    {
      name: "lastName",
      type: "input",
      message: "Please enter the last name of the employee"
    },
    {
      name: "role",
      type: "list",
      message: "What is the role?",
      choices: inputRole(),
    },
    {
      name: "manager",
      type: "rawlist",
      message: "What is your manager's name?",
      choices: choiceManger()
    }
  ]).then(function (input) {
    var roleInfo = inputRole().indexOf(input.role) + 1
    var managerInfo = choiceManger().indexOf(input.manager) + 1
    connection.query("INSERT INTO employee SET ?",
      {
        first_name: input.firstName,
        last_name: input.lastName,
        manager_id: managerInfo,
        role_id: roleInfo
      }, function (err) {
        if (err) throw err
        console.table(input)
        displayPrompt()
      })
  })
}



// "Update Employee Manager"

// "View All Roles"
const viewAllRoles = async () => {
  console.log('Selecting all Roles:');
  const res = await connection.query("SELECT * From role");
  console.table(res);
  displayPrompt();

};


// "Add Role"
const addRole = () => {
  console.log('Adding a role: ');
  inquirer.prompt([
    {
      name: "title",
      type: "input",
      message: "What is the new role you want to add?"
    },
    {
      name: "salary",
      type: "input",
      message: "What is the new salary you want to add?"
    },
  ]).then(function (input) {
    connection.query("Insert Into role SET ? ",
      {
        title: input.title,
        salary: input.salary
      }, (err) => {
        if (err) throw err;
        console.table(input)
        viewAllRoles();
        displayPrompt();
      })

  });
}

var choiceRoles = [];
var viewRolesChoices = async () => {
  console.log('Selecting all Roles:');
  const res = await connection.query("SELECT id, title, salary, department_id From role");
  for (var i = 0; i < res.length; i++) {
    choiceRoles.push({ value: res[i].id, name: res[i].title + " " + res[i].salary });

  }
  console.log(choiceRoles);
  return choiceRoles;
};
// "Remove Role"
var removeRole = async () => {
  inquirer.prompt([
    {
      name: "choiceRoles",
      type: "list",
      message: "Which role do you want to delete?",
      choices: await viewRolesChoices()
    },
  ]).then(function (input) {
    connection.query(
      'DELETE FROM role WHERE ?',
      {
        id: input.choiceRoles,
      },
      function (err) {
        if (err) throw err
        console.log("Deleting a role.....");
        console.table(input);
        displayPrompt();
      }
    )
  })
}
// "View All Department by Just Department"
var viewDepartment = async () => {
  const res = await connection.query('Select id, name from department');
  console.table(res);
  displayPrompt();
};

// "Add Department"
function addDepartment() {
  inquirer.prompt([
    {
      name: "departmentName",
      type: "input",
      message: "Enter a new department: ",
    },
  ]).then(function (input) {
    connection.query('INSERT into department SET ?',
      {
        name: input.departmentName
      }, function (err) {
        if (err) throw err
        console.table(input)
        displayPrompt();
      })
  })
}
// "Remove Department",
var departmentArray = [];
var departmentByInput = async () => {
  const res = await connection.query('Select id, name from department');
  for (var i = 0; i < res.length; i++) {
    departmentArray.push({ value: res[i].id, name: res[i].name });
  }
  return departmentArray;
};

var removeDepartment = async () => {
  inquirer.prompt([
    {
      name: "departmentId",
      type: "list",
      message: "Enter a new department: ",
      choices: await departmentByInput()
    },
  ]).then(function (input) {
    connection.query('DELETE FROM department WHERE ?',
      {
        id: input.departmentId
      },
      function (err) {
        if (err) throw err
        console.table(input)
        viewDepartment();
        displayPrompt();
      })
  })
}

const readEmployeesByName = async () => {
  var nameArray = [];
  console.log('Selecting id, first, and last names from Employees...');
  const res = await connection.query('SELECT id,first_name, last_name from employee');
  for (var i = 0; i < res.length; i++) {
    nameArray.push({ value: res[i].id, name: res[i].first_name + " " + res[i].last_name });
  }
  return nameArray;
  //  [
  //   { value: 1, name: 'John Doe' },
  //   { value: 2, name: 'Mike Chan' },
  //   { value: 3, name: 'Ashley Rodriquez' },
  //   { value: 5, name: 'Sarah Lourd' },
  //   { value: 7, name: 'Kevin Tupik' },
  //   { value: 8, name: 'Jason Parse' },
  //   { value: 9, name: 'Jack Ripper' }
  // ]
};

//"Remove Employee:"
const deleteEmployee = async () => {
  inquirer.prompt([
    {
      name: "employee",
      type: "list",
      message: "Please select the employee you want to remove: ",
      choices: await readEmployeesByName()
    },

  ]).then(function (input) {
    console.log(input);
    // var roleInfo = inputRole().indexOf(input.role) + 1
    // var managerInfo = choiceManger().indexOf(input.manager) + 1
    connection.query(
      'DELETE FROM employee WHERE ?',
      {
        id: input.employee,
      },
      function (err) {
        if (err) throw err
        console.log('Deleting Employee...\n');
        console.table(input);
        displayPrompt();
      })
  })
}
// "View All Department"
var nameByDepartment = [];
const viewAllDepartment = async () => {
  const res = await connection.query('SELECT employee.first_name, employee.last_name, department.name AS Department FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id');
  for (var i = 0; i < res.length; i++) {
    nameByDepartment.push({ value: res[i].id, name: res[i].first_name + " " + res[i].last_name })
  }
  return nameByDepartment;
};

var roleEmployee = [];
var readRoleofEmployee = async () => {
  console.log('Selecting all Employees...');
  const res = await connection.query('SELECT id, title, salary FROM role');
  for (var i = 0; i < res.length; i++) {
    roleEmployee.push({ value: res[i].id, name: res[i].title + " " + res[i].salary });
  }
  console.log(roleEmployee);
  return roleEmployee;
};

// "Update Employee Role",
var updateEmployeeRole = async () => {
  inquirer.prompt([
    {
      name: "employee",
      type: "list",
      message: "Please select the employee you want to update: ",
      choices: await readEmployeesByName()
    },
    {
      name: "updateRoles",
      type: "list",
      message: "Which title role do you want to update to?",
      choices: await viewRolesChoices()
    },
  ]).then(function (input) {
    connection.query(
      'UPDATE employee SET ? WHERE ?',
      [{
        role_id: input.updateRoles,
      },
      {
        id: input.employee,
      },
      ],
      function (err, result) {
        if (err) throw err
        console.log('Updating all Employee Role...\n');
        console.table(input);
        displayPrompt();
      }
    )
  })
}

// "Update Employee Manager",
var updateManager = async () => {
  // connection.query('Select first_name, last_name from employee', function(err, res)
  // {
  inquirer.prompt([
    {
      name: "employeeName",
      type: "list",
      message: "Please select the employee name you want to update the manager for: ",
      choices: await readEmployeesByName()
    },
    {
      name: "manager",
      type: "list",
      message: "What is the name of the manager?",
      choices: await readEmployeesByName()
    },

  ]).then(function (input) {
    var managerInfo = choiceManger().indexOf(input.manager)
    connection.query(
      'Update employee SET ? WHERE ?',
      [
        {
          manager_id: input.manager,
        },
        {
          id: input.employeeName,
        },

      ],
      function (err) {
        if (err) throw err
        console.log('Updating an Employee with the manager...\n');
        console.table(input);
        displayPrompt();
      }
    )
  })
}
// Connect to the DB
connection.connect((err) => {
  if (err) throw err;
  console.log(`connected as id ${connection.threadId}\n`);
  displayPrompt();
});

//display what the user can do
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
      if (todoList === "View All Employees") { readEmployees(); }
      else if (todoList === "View All Employees By Department") { readEmployeesBYDepart(); }
      else if (todoList === "View All Employees By Manager") { readEmployeesBYManager(); }
      else if (todoList === "Add Employee") { addEmployee(); }
      else if (todoList === "Remove Employee") { deleteEmployee(); }
      else if (todoList === "Update Employee Role") { updateEmployeeRole(); } //does not work

      else if (todoList === "Update Employee Manager") { updateManager(); }
      else if (todoList === "View All Roles") { viewAllRoles(); }
      else if (todoList === "Add Role") { addRole(); }
      else if (todoList === "Remove Role") { removeRole(); }
      else if (todoList === "View All Department") { viewDepartment(); }
      else if (todoList === "Add Department") { addDepartment(); }
      else if (todoList === "Remove Department") { removeDepartment(); }

      else if (todoList === "Quit") { console.log("Goodbye"); }
      else {
        console.log("An error has occured!");
      }
    });

}

const { read } = require('fs/promises');
const mysql = require('mysql');
const cTable = require('console.table');

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
        // console.log(res);
        console.table(res);
        connection.end();
        
    });
};
readProducts();



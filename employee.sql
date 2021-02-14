Create database employeelist;
use employeelist;
Create table if not exists department(
    id int Primary key auto_increment,
    name VARCHAR(30)
);
Create table role (
    id int AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL(30,2),
    department_id int
);
Create table employee (
    id int AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id int,
    manager_id int
);

select * from department
select * from role
select * from employee
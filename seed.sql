INSERT INTO department(name) VALUES 
('Marketing'),
('Finance'),
('Human Resources'),
('Production'),
('Development'),
('Quality Management'),
('Sales'),
('Research'),
('Customer Service');

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

Insert into role(title, salary, department_id) VALUES
('Marketing', 150000, 15),
('Finance', 150000, 14),
('Human Resources', 90000, 13),
('Research', 90000, 12),
('Development', 1300000, 11);

Insert into employee(first_name, last_name, role_id, manager_id) VALUES
('John', 'Doe', 10, 10 ),
('Mike', 'Chan', 9, 9 ),
('Ashley', 'Rodriquez', 8, 8 ),
('Kevin', 'Tupik', 7, 7 ),
('Sarah' , 'Lourd', 6, 6);




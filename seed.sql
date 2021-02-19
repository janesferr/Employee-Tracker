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

Insert into role(title, salary, department_id) VALUES
('Marketer', 150000, 1),
('Finance Analyst', 150000, 2),
('HR Manager', 90000, 3),
('Researcher', 90000, 8),
('Engineer', 1300000, 5);

Insert into employee(first_name, last_name, manager_id, role_id) VALUES
('John', 'Doe', 1, 2 ),
('Mike', 'Chan', 2, 3 ),
('Ashley', 'Rodriquez', null, 3 ),
('Kevin', 'Tupik', 1, 4 ),
('Sarah' , 'Lourd', 2, 5);



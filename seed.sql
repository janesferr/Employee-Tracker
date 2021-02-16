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
('Marketing', 150000, 1),
('Finance', 150000, 2),
('Human Resources', 90000, 3),
('Research', 90000, 8),
('Development', 1300000, 5);

Insert into employee(first_name, last_name, manager_id, role_id) VALUES
('John', 'Doe', 1, 2 ),
('Mike', 'Chan', 2, 3 ),
('Ashley', 'Rodriquez', null, 3 ),
('Kevin', 'Tupik', 1, 4 ),
('Sarah' , 'Lourd', 2, 5);



-- Insert departments
INSERT INTO department (name) VALUES ('Sales'), ('Engineering'), ('Finance');

-- roles
INSERT INTO role (title, salary, department_id) VALUES
('Sales Manager', 60000, 1),
('Engineer', 80000, 2),
('Accountant', 70000, 3);

-- Insert employees
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('Nick', 'Sokolowski', 1, NULL),
('Gary', 'Busey', 2, 1),
('Peggy', 'Hill', 3, 1);

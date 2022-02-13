INSERT INTO department (name)
VALUES ("Accounting"), ("Marketing"), ("HR"),;

INSERT INTO role (title, salary, department_id)
VALUES ("CEO", 200000), ("CFO", 150000.00, 1), ("Treasurer", 100000, 1), ("Accountant", 80000, 1), ("CMO", 140000, 2), ("Back End Developer", 120000, 2), ("Front End Developer", 110000, 2), ("Social Media Manager", 90000, 2), ("HR Director", 130000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Gandalf", "Grey", 1, null), ("Aragorn", "Elessar", 2, 1), ("Legolas", "Greenleaf", 3, 2), ("Gimli", "Durin", 4, 2), ("Frodo", "Baggins", 5, 1), ("Samwise", "Gamgee", 6, 5), ("Meriadoc", "Brandybuck", 7, 5), ("Peregrin", "Took", 8, 5), ("Gollum", "Gollum", 9, 1);
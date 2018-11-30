DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NULL,
  price DECIMAL(6,2) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Banana', 'Fruits', 2.50, 5), ('Orange', 'Fruits', 1.50, 5),
('Apple', 'Fruits', 0.50, 5), ('Carrot', 'Vegetables', 0.50, 5), ('Eggplant', 'Vegetables', 3.50, 5), 
('Cucumber', 'Vegetables', 1.50, 5), ('Chips', 'Snacks', 2.50, 5), ('Candy', 'Snacks', 2.00, 5),
('Juice', 'Drinks', 4.00, 5), ('Water Bottle', 'Drinks', 1.50, 5);
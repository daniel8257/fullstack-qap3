-- sql/operations.sql

-- Insert Data
INSERT INTO products (name, price, description)
VALUES 
    ('Apple', 1.00, 'A fresh apple'),
    ('Banana', 0.50, 'A ripe banana'),
    ('Orange', 0.75, 'A juicy orange');

-- Select Data
SELECT * FROM products;

-- Update Data
UPDATE products
SET price = 1.10
WHERE name = 'Apple';

-- Delete Data
DELETE FROM products
WHERE name = 'Banana';

-- Select Data Again to Confirm Changes
SELECT * FROM products;

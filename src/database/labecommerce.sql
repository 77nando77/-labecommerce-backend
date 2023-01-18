-- Active: 1673884993170@@127.0.0.1@3306
CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);

INSERT INTO users(id,email,password)
VALUES('1','luiz@gmail.com','123456'),
('2','jose@gmail.com','54321'),
('3','marlene@gmail.com','asd1234');

DROP TABLE users;

CREATE TABLE products (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    category TEXT NOT NULL
);

INSERT INTO products(id, name, price, category)
VALUES('1', 'Mouse Razer', 250, 'perifericos'),
('2', 'Web Cam Sony', 340.50, 'eletronicos'),
('3', 'Controle Xbox One', 200, 'acessorios'),
('4', 'Teclado Redragon', 150.50, 'perifericos'),
('5', 'Monitor Samsung', 1099.99, 'eletronicos');

DROP TABLE products;

SELECT * FROM users
ORDER BY email ASC;

SELECT * FROM products
ORDER BY price ASC
LIMIT 20 OFFSET 0;

SELECT * FROM products
WHERE price > 100.00 AND price < 300.00
ORDER BY price ASC;

SELECT * FROM products
WHERE name LIKE '%te%';

INSERT INTO users (id,email,password)
VALUES('4', 'gustavo@gmail.com', '147852');

INSERT INTO products (id, name, price, category)
VALUES('6', 'iPhone', 1200.99, 'eletronicos');

SELECT * FROM products
WHERE id = 5;

DELETE FROM users
WHERE id = 4;

DELETE FROM products
WHERE id = 5;

UPDATE users
SET 
    email = 'nando@gmail.com',
    password = '151515'
WHERE id = 1;

UPDATE products
SET
    price = '150.90'
WHERE id = 2;


CREATE TABLE purchases (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    total_price REAL UNIQUE NOT NULL,
    paid INTEGER NOT NULL,
    delivered_at TEXT,
    buyer_id TEXT NOT NULL,
    Foreign Key (buyer_id) REFERENCES users(id)
);

DROP TABLE purchases;

SELECT * FROM users;

INSERT INTO purchases (id, total_price, paid, buyer_id)
VALUES
    ('p001', 595.99, 0, '1'),
    ('p002', 450, 0, '2'),
    ('p003', 1500.50, 0, '2'),
    ('p004', 744.99, 0, '3');

SELECT * from purchases;

UPDATE purchases
SET
    paid = 1,
    delivered_at = strftime('%d-%m-%Y', 'now')
WHERE purchases.id = 'p004';

UPDATE purchases
SET
    paid = 1,
    delivered_at = strftime('%d-%m-%Y', 'now')
WHERE buyer_id = '2';

SELECT * FROM users
INNER JOIN purchases
ON purchases.buyer_id = users.id
WHERE users.id = '1';




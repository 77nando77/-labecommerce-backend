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

SELECT * FROM users;

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

SELECT * FROM products
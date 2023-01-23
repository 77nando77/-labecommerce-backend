-- Active: 1673884993170@@127.0.0.1@3306
CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);

CREATE TABLE products (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    category TEXT NOT NULL
);

CREATE TABLE purchases (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    total_price REAL NOT NULL,
    paid INTEGER NOT NULL,
    delivered_at TEXT,
    buyer_id TEXT NOT NULL,
    Foreign Key (buyer_id) REFERENCES users(id)
);

CREATE TABLE purchases_products(
    purchase_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    FOREIGN KEY (purchase_id) REFERENCES purchases(id)
    FOREIGN KEY (product_id) REFERENCES products(id)
);

INSERT INTO users(id,email,password)
VALUES
    ('u001','luiz@gmail.com','123456'),
    ('u002','jose@gmail.com','54321'),
    ('u003','marlene@gmail.com','asd1234');

INSERT INTO products(id, name, price, category)
VALUES
    ('p001', 'Mouse Razer', 250, 'perifericos'),
    ('p002', 'Web Cam Sony', 340.50, 'eletronicos'),
    ('p003', 'Controle Xbox One', 200, 'acessorios'),
    ('p004', 'Teclado Redragon', 150.50, 'perifericos'),
    ('p005', 'Monitor Samsung', 1099.99, 'eletronicos');

INSERT INTO purchases (id, total_price, paid, buyer_id)
VALUES
    ('c001', 595.99, 0, 'u001'),
    ('c002', 450, 0, 'u002'),
    ('c003', 1500.50, 0, 'u002'),
    ('c004', 744.99, 0, 'u003');

INSERT INTO purchases_products(purchase_id, product_id, quantity)
VALUES
    ('c001','p001','2'),
    ('c002', 'p005', '1'),
    ('c004', 'p003', '5');

DROP TABLE users;

DROP TABLE products;

DROP TABLE purchases;

DROP TABLE purchases_products;


SELECT * FROM users;


SELECT * FROM products;


SELECT * FROM purchases;


SELECT * FROM purchases_products;


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
VALUES('u004', 'gustavo@gmail.com', '147852');


INSERT INTO products (id, name, price, category)
VALUES('6', 'iPhone', 1200.99, 'eletronicos');


SELECT * FROM products
WHERE id = 'p005';


DELETE FROM users
WHERE id = 'u004';


DELETE FROM products
WHERE id = 'p005';


UPDATE users
SET 
    email = 'nando@gmail.com',
    password = '151515'
WHERE id = 'u001';


UPDATE products
SET
    price = '150.90'
WHERE id = 'p002';


UPDATE purchases
SET
    paid = 1,
    delivered_at = strftime('%d-%m-%Y', 'now')
WHERE purchases.id = 'c004';


UPDATE purchases
SET
    paid = 1,
    delivered_at = strftime('%d-%m-%Y', 'now')
WHERE buyer_id = 'u002';


SELECT * FROM users
INNER JOIN purchases
ON purchases.buyer_id = users.id
WHERE users.id = 'u001';


SELECT 
    purchases.buyer_id AS userId,
    users.email AS userEmail,
    users.password AS userPassword,
    purchases_products.purchase_id AS purchaseId,
    purchases_products.product_id AS productId,
    products.name AS productName,
    products.category AS productCategory,
    products.price AS productPrice,
    purchases_products.quantity AS ProductQuantity,
    purchases.total_price AS productTotalPrice,
    purchases.paid AS purchasePaid,
    purchases.delivered_at AS purchaseDelivered
FROM purchases_products
INNER JOIN products
ON purchases_products.product_id = products.id
RIGHT JOIN purchases
ON purchases_products.purchase_id = purchases.id
INNER JOIN users
ON buyer_id = users.id;

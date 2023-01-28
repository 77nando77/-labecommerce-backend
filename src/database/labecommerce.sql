-- Active: 1673884993170@@127.0.0.1@3306
CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TEXT DEFAULT (strftime('%d-%m-%Y-%H-%M-%S', 'now','localtime')) 
);

CREATE TABLE products (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL
);

CREATE TABLE purchases (
    id TEXT PRIMARY KEY NOT NULL,
    buyer_id TEXT NOT NULL,
    total_price REAL NOT NULL,
    created_at TEXT DEFAULT (strftime('%d-%m-%Y-%H-%M-%S', 'now','localtime')),
    paid INTEGER,
    Foreign Key (buyer_id) REFERENCES users(id)
);

CREATE TABLE purchases_products(
    purchase_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    FOREIGN KEY (purchase_id) REFERENCES purchases(id)
    FOREIGN KEY (product_id) REFERENCES products(id)
);

INSERT INTO users(id,name,email,password)
VALUES
    ('u001', "luiz", 'luiz@gmail.com','123456'),
    ('u002', "jose", 'jose@gmail.com','54321'),
    ('u003', 'marlene', 'marlene@gmail.com','asd1234');

INSERT INTO products(id, name, price, description, image_url)
VALUES
    ('p001', 'Mouse Razer', 250, 'Mouse Razer gamer com grande precisão e muito conforto para mão.', 'https://picsum.photos/200'),
    ('p002', 'Headset Corsair', 340.50, 'headset com muito conforto, espuma macia, qualidade de grave e outro sons.', 'https://picsum.photos/200'),
    ('p003', 'Controle Xbox One', 200, 'controle de Xbox com na cor branca e conectivedade com computadores.','https://picsum.photos/200'),
    ('p004', 'Teclado Redragon', 150.50, 'teclado mecanico switch azul, teclas com funções multimídia e funcionalidade de bloqueio da tecla Windows.', 'https://picsum.photos/200'),
    ('p005', 'Monitor Samsung', 1099.99, 'Monitor Gamer Samsung 27 polegadas e 144hz', 'https://picsum.photos/200');

INSERT INTO purchases (id, buyer_id, total_price, paid)
VALUES
    ('c001', 'u001', 551, 0),
    ('c002', 'u002', 831.5, 0),
    ('c003', 'u002', 1299.99, 0),
    ('c004', 'u003', 1822.50, 0);

INSERT INTO purchases_products(purchase_id, product_id, quantity)
VALUES
    ('c001','p001','1'),
    ('c001','p004','2'),
    ('c002', 'p002', '2'),
    ('c002', 'p004', '1'),
    ('c003', 'p005', '1'),
    ('c003', 'p003', '1'),
    ('c004', 'p001', '2'),
    ('c004', 'p002', '3'),
    ('c004', 'p004', '2');

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
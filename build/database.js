"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.purchases = exports.products = exports.users = exports.getAllPurchasesFromUserId = exports.createPurchase = exports.queryProductsByName = exports.getProductById = exports.getAllProducts = exports.createProduct = exports.getAllUsers = exports.createUsers = void 0;
const types_1 = require("./types");
function createUsers(id, email, password) {
    exports.users.push({ id, email, password });
    return ("Cadastro registrado com sucesso");
}
exports.createUsers = createUsers;
function getAllUsers() {
    return exports.users;
}
exports.getAllUsers = getAllUsers;
function createProduct(id, name, price, category) {
    exports.products.push({ id, name, price, category });
    return ("Produto registrado com sucesso");
}
exports.createProduct = createProduct;
function getAllProducts() {
    return exports.products;
}
exports.getAllProducts = getAllProducts;
function getProductById(productId, idOfProduct) {
    return productId.filter((product) => {
        return product.id === idOfProduct;
    });
}
exports.getProductById = getProductById;
function queryProductsByName(nameOfProduct) {
    return exports.products.filter((product) => {
        return product.name.includes(nameOfProduct);
    });
}
exports.queryProductsByName = queryProductsByName;
function createPurchase(userId, productId, quantity, totalPrice) {
    exports.purchases.push({ userId, productId, quantity, totalPrice });
    return ("Compra finalizada com sucesso");
}
exports.createPurchase = createPurchase;
function getAllPurchasesFromUserId(userId) {
    return exports.purchases.filter((purchase) => {
        return purchase.userId === userId;
    });
}
exports.getAllPurchasesFromUserId = getAllPurchasesFromUserId;
exports.users = [
    {
        id: "1",
        email: "Luiz@gmail.com",
        password: "123456"
    },
    {
        id: "2",
        email: "Jose@gmail.com",
        password: "54321"
    }
];
exports.products = [
    {
        id: "15",
        name: "Mouse Razer",
        price: 250.00,
        category: types_1.Category.PERIFERICS
    },
    {
        id: "27",
        name: "Web Cam Sony",
        price: 340.50,
        category: types_1.Category.ELECTRONICS
    }
];
exports.purchases = [
    {
        userId: "1",
        productId: "15",
        quantity: 1,
        totalPrice: 250.00
    },
    {
        userId: "2",
        productId: "27",
        quantity: 1,
        totalPrice: 340.50
    }
];
//# sourceMappingURL=database.js.map
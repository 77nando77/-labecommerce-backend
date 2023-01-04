"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database");
const types_1 = require("./types");
console.log((0, database_1.createUsers)("5", "pedro@gmail.com", "101010"));
console.table((0, database_1.getAllUsers)());
console.log((0, database_1.createProduct)("20", "controle Xbox", 200.00, types_1.Category.ACCESSORIES));
console.table((0, database_1.getAllProducts)());
console.log((0, database_1.getProductById)(database_1.products, "20"));
console.log((0, database_1.queryProductsByName)("R"));
console.log((0, database_1.createPurchase)("1", "30", 1, 70.00));
console.log((0, database_1.getAllPurchasesFromUserId)("1"));
//# sourceMappingURL=index.js.map
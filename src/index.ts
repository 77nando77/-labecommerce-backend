import { users, products, purchases, createUsers, getAllUsers, createProduct, getAllProducts, getProductById, queryProductsByName, createPurchase, getAllPurchasesFromUserId} from "./database"
import { Category } from "./types"

// console.table(users)
// console.table(products)
// console.table(purchases)

console.log(createUsers("5","pedro@gmail.com","101010"))

console.table(getAllUsers())

console.log(createProduct("20", "controle Xbox", 200.00, Category.ACCESSORIES))

console.table(getAllProducts())

console.log(getProductById(products, "20"))

console.log(queryProductsByName("R"))

console.log(createPurchase("1", "30", 1 , 70.00))

console.log(getAllPurchasesFromUserId("1"))

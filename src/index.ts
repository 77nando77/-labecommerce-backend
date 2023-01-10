import { users, products, purchases, createUsers, getAllUsers, createProduct, getAllProducts, getProductById, queryProductsByName, createPurchase, getAllPurchasesFromUserId } from "./database"
import { Category, TProduct, TPurchase, TUser } from "./types"
import express, { Request, Response } from "express"
import cors from "cors"

// console.table(users)
// console.table(products)
// console.table(purchases)

// console.log(createUsers("5","pedro@gmail.com","101010"))

// console.table(getAllUsers())

// console.log(createProduct("20", "controle Xbox", 200.00, Category.ACCESSORIES))

// console.table(getAllProducts())

// console.log(getProductById(products, "20"))

// console.log(queryProductsByName("R"))

// console.log(createPurchase("1", "30", 1 , 70.00))

// console.log(getAllPurchasesFromUserId("1"))

const app = express()

app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

app.get("/ping", (req: Request, res: Response) => {
    res.send("Pong!")
})

app.get("/users", (req: Request, res: Response) => {
    res.status(200).send(users)
})

app.get("/products", (req: Request, res: Response) => {
    res.status(200).send(products)
})

app.get("/purchases", (req: Request, res: Response)=>{
    res.status(200).send(purchases)
})

app.get("/products/search", (req: Request, res: Response) => {
    const q = req.query.q as string

    const result = products.filter((product)=>{
        return product.name.toLowerCase().includes(q.toLowerCase())
    })

    res.status(200).send(result)
})

app.post("/users", (req: Request, res: Response)=>{
    const {id, email, password} = req.body as TUser

    const newUser ={
        id,
        email,
        password
    }

    users.push(newUser)

    res.status(201).send("Usuário cadastrado com sucesso")
})

app.post("/products", (req: Request, res: Response)=>{
    const {id, name, price, category} = req.body as TProduct

    const newProduct ={
        id,
        name,
        price,
        category
    }

    products.push(newProduct)

    res.status(201).send("Produto cadastrado com sucesso")
})

app.post("/purchases",(req: Request, res: Response) =>{
    const {userId, productId, quantity, totalPrice} = req.body as TPurchase

    const newPurchase ={
        userId,
        productId,
        quantity,
        totalPrice
    }

    purchases.push(newPurchase)

    res.status(201).send("Compra realizada com sucesso")
})
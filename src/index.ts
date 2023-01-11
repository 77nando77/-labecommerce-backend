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

app.get("/products/:id",(req:Request, res: Response)=>{
    const id = req.params.id

    const findProduct = products.find((product)=>{
        return product.id === id
    })

    res.status(200).send(findProduct)
})

app.get("/users/:id/purchases",(req:Request, res:Response)=>{
    const id = req.params.id

    const findUser = users.find((user)=> user.id === id
    )
    if(findUser){
        const getUserPurchases = purchases.filter((purchase)=>{
            return purchase.userId === findUser.id
        })
        res.status(200).send(getUserPurchases)
    }
})

app.delete("/user/:id", (req:Request, res:Response)=>{
    const id = req.params.id

    const user = users.findIndex((user)=>{
        return user.id === id
    })

    if(user !== -1){
        users.splice(user,1)
        res.status(200).send("Usuário deletado com sucesso")
    }else{
        res.status(404).send("Usuário não encontrado")
    }

})

app.delete("/product/:id",(req: Request, res: Response)=>{
    const id = req.params.id

    const product = products.findIndex((product)=>{
        return product.id === id
    })

    if(product !== -1){
        products.splice(product,1)
        res.status(200).send("Produto deletado com sucesso")
    }else{
        res.status(404).send("Produto não encontrado")
    }

})

app.put("/user/:id",(req:Request, res:Response)=>{
    const userId = req.params.id

    const newId = req.body.id as string | undefined
    const newEmail = req.body.email as string | undefined
    const newPassword = req.body.password as string | undefined

    const user = users.find((user)=>{
        return user.id === userId
    })

    if(user){
        user.id = newId || user.id
        user.email = newEmail || user.email
        user.password = newPassword || user.password
        res.status(200).send("Usuário editado com sucesso")
    }else{
        res.status(404).send("Usuário não encontrado")
    }

})

app.put("/product/:id",(req:Request, res:Response)=>{
    const productId = req.params.id

    const newId = req.body.id as string | undefined
    const newName = req.body.name as string | undefined
    const newCategory = req.body.category as Category

    const product = products.find((product)=>{
        return product.id === productId
    })

    if(product){
        product.id = newId || product.id
        product.name = newName || product.name
        product.category = newCategory || product.category
        res.status(200).send("Usuário editado com sucesso")
    }else{
        res.status(404).send("Usuário não encontrado")
    }

})
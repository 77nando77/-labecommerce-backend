import { users, products, purchases, createUsers, getAllUsers, createProduct, getAllProducts, getProductById, queryProductsByName, createPurchase, getAllPurchasesFromUserId } from "./database"
import { Category, TProduct, TPurchase, TUser } from "./types"
import express, { Request, Response } from "express"
import cors from "cors"
import { db } from "./database/knex"

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

app.get("/users", async (req: Request, res: Response) => {
    try {

        const result = await db.raw(`SELECT * FROM users`)

        res.status(200).send(result)
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

app.get("/products", async (req: Request, res: Response) => {
    try {

        const result = await db.raw(`SELECT * FROM products`)

        res.status(200).send(result)
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

app.get("/purchases", async (req: Request, res: Response) => {
    try {

        const result = await db.raw(`SELECT * FROM purchases`)

        res.status(200).send(result)
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }

})

app.get("/products/search", async (req: Request, res: Response) => {
    try {
        const q = req.query.q as string

        if (q.length <= 0) {
            res.status(400)
            throw new Error("O produto deve ter pelo menos uma letra")
        }

        const [result] = await db.raw(`
        SELECT * FROM products
        WHERE name LIKE "%${q}%"`)

        if (!result) {
            res.status(404)
            throw new Error("Este produto não existe")
        }

        res.status(200).send(result)

    } catch (error: any) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})

app.post("/users", async (req: Request, res: Response) => {
    try {
        const { id, email, password } = req.body as TUser

        const newUser = {
            id,
            email,
            password
        }

        const result = await db.raw(`
        SELECT * FROM users
        `)


        const existingId = result.find((user:any) => {
            return user.id === newUser.id
        })
        const existingemail = result.find((user:any) => {
            return user.email === newUser.email
        })


        if (newUser.id === undefined) {
            res.status(400)
            throw new Error("Para criar um usuário é necessário 'id'")
        }
        if (existingId) {
            res.status(422)
            throw new Error("esse 'id' já existe")
        }

        if (typeof newUser.id !== "string") {
            res.status(400)
            throw new Error("'id' tem que ser string")
        }


        if (newUser.email === undefined) {
            res.status(400)
            throw new Error("Para criar um usuário é necessário 'email'")
        }
        if (typeof newUser.email !== "string") {
            res.status(400)
            throw new Error("'Email' deve ser uma string")
        }
        if (!newUser.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
            throw new Error("Parâmetro 'email' inválido")
        }
        if (existingemail) {
            res.status(422)
            throw new Error("Email já foi cadastrado")
        }


        if (newUser.password === undefined) {
            res.status(400)
            throw new Error("Para criar um usuário é necessário 'senha'")
        }
        if (typeof newUser.password !== "string") {
            res.status(400)
            throw new Error("'Senha' deve ser uma string")
        }
        if (newUser.password.length <= 6) {
            res.status(400)
            throw new Error("Senha precisa ter mais de 6 caracteres")
        }

        await db.raw(`
        INSERT INTO users(id, email, password)
        VALUES("${id}","${email}","${password}")
        `)

        res.status(201).send("Usuário cadastrado com sucesso")
    } catch (error: any) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})

app.post("/products", async (req: Request, res: Response) => {
    try {
        const { id, name, price, category } = req.body as TProduct

        const newProduct = {
            id,
            name,
            price,
            category
        }

        const result = await db.raw(`
        SELECT * FROM products
        `)

        const existingId = result.find((product:any) => {
            return product.id === newProduct.id
        })


        if (newProduct.id === undefined) {
            res.status(400)
            throw new Error("É necessário um 'id' para cadastrar o produto")
        }
        if (existingId) {
            res.status(422)
            throw new Error("O 'id' registrado já existe")
        }
        if (typeof newProduct.id !== "string") {
            res.status(400)
            throw new Error("O 'id' do produto deve ser uma string");
        }


        if (newProduct.name === undefined) {
            res.status(400)
            throw new Error("É necessário um nome no produto para o cadastro");
        }
        if (typeof newProduct.name !== "string") {
            res.status(400)
            throw new Error("O nome do produto deve ser uma string");
        }


        if (newProduct.price === undefined) {
            res.status(400)
            throw new Error("O produto precisa de um preço para ser cadastrado");
        }
        if (newProduct.price <= 0) {
            res.status(400)
            throw new Error("O preço do produto deve ser positivo");
        }
        if (typeof newProduct.price !== "number") {
            res.status(400)
            throw new Error("O preço do produto deve ser um number");
        }


        if (newProduct.category === undefined) {
            res.status(404)
            throw new Error("O produto deve ter uma categoria para ser cadastrado");
        }
        if (
            newProduct.category !== Category.ACCESSORIES &&
            newProduct.category !== Category.ELECTRONICS &&
            newProduct.category !== Category.PERIFERICS
        ) {
            res.status(400)
            throw new Error("A categoria do produto deve ser: Acessórios, Periféricos ou Eletrônicos")
        }

        await db.raw(`
        INSERT INTO products(id, name, price, category)
        VALUES("${id}", "${name}", "${price}", "${category}")`)

        res.status(201).send("Produto cadastrado com sucesso")
    } catch (error: any) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})

app.post("/purchases", async (req: Request, res: Response) => {
    try {
        const { id, total_price, paid, buyer_id } = req.body

        const newPurchase = {
            id,
            total_price,
            paid,
            buyer_id
        }

        const user = await db.raw(`
        SELECT * FROM users`)

        const product = await db.raw(`
        SELECT * FROM products`)

        const existingId = user.find((user: any) => {
            return user.id === newPurchase.buyer_id
        })


        if (newPurchase.id === undefined) {
            res.status(400)
            throw new Error("É necessário um 'id do usuário' para cadastrar a compra")
        }
        if (typeof newPurchase.id !== "string") {
            res.status(400)
            throw new Error("O 'id do usuário' deve ser uma string");
        }
        if (!existingId) {
            res.status(404)
            throw new Error("Usuário não cadastrado")
        }


        if (newPurchase.id === undefined) {
            res.status(400)
            throw new Error("É necessário um 'id do produto' para cadastrar a compra")
        }
        if (typeof newPurchase.id !== "string") {
            res.status(400)
            throw new Error("O 'id do produto' deve ser uma string");
        }


        if (newPurchase.total_price === undefined) {
            res.status(400)
            throw new Error("Para fazer a compra é necessário o total da compra");
        }
        if (typeof newPurchase.total_price !== "number") {
            res.status(400)
            throw new Error("O total da compra deve ser um number");
        }

        await db.raw(`
        INSERT INTO purchases(id, total_price, paid, buyer_id)
        VALUES("${id}", ${total_price}, ${paid}, "${buyer_id}")`)

        res.status(201).send("Compra realizada com sucesso")
    } catch (error: any) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})

app.get("/products/:id", async(req: Request, res: Response) => {
    try {
        const id = req.params.id

        const [result] = await db.raw(`
        SELECT * FROM products
        WHERE id = "${id}"`)

        if(!result){
            res.status(400)
            throw new Error("Produto não encontrado")
        }

        res.status(200).send(result)
    } catch (error: any) {
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})

app.get("/users/:id/purchases", async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        
        const [result] = await db.raw(`
        SELECT * FROM purchases
        WHERE Buyer_id = "${id}"`)

        if (!result) {
            res.status(404)
            throw new Error("Usuário não encotrado");
        }
            res.status(200).send(result)


    } catch (error: any) {
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }


})

app.delete("/user/:id", (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const user = users.findIndex((user) => {
            return user.id === id
        })

        const findUser = users.find((user) => {
            return user.id === id
        })

        if (!findUser) {
            res.status(404)
            throw new Error("Usuário não encontrado");
        }

        if (user >= 0) {
            users.splice(user, 1)
            res.status(200).send("Usuário deletado com sucesso")
        } else {
            res.status(404).send("Usuário não encontrado")
        }

    } catch (error: any) {
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }

})

app.delete("/product/:id", (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const product = products.findIndex((product) => {
            return product.id === id
        })

        const findProduct = products.find((product) => {
            return product.id === id
        })
        if (!findProduct) {
            res.status(404)
            throw new Error("produto não encontrado")
        }
        if (product >= 0) {
            products.splice(product, 1)
            res.status(200).send("Produto deletado com sucesso")
        } else {
            res.status(404).send("Produto não encontrado")
        }
    } catch (error: any) {
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }



})

app.put("/user/:id", (req: Request, res: Response) => {
    try {
        const userId = req.params.id

        const newId = req.body.id
        const newEmail = req.body.email
        const newPassword = req.body.password

        const existingemail = users.find((user) => {
            return user.email === newEmail
        })

        const user = users.find((user) => {
            return user.id === userId
        })

        if (!user) {
            res.status(404)
            throw new Error("Usuário não encontrado")
        }

        if (newEmail !== undefined) {
            if (typeof newEmail !== "string") {
                res.status(400)
                throw new Error("'Email' deve ser uma string")
            }
            if (!newEmail.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
                throw new Error("Parâmetro 'email' inválido")
            }
            if (existingemail) {
                res.status(422)
                throw new Error("Email já foi cadastrado")
            }
        }
        if (newPassword !== undefined) {
            if (typeof newPassword !== "string") {
                res.status(400)
                throw new Error("'Senha' deve ser uma string")
            }
            if (newPassword.length <= 6) {
                res.status(400)
                throw new Error("Senha precisa ter mais de 6 caracteres")
            }
        }

        if (user) {
            user.email = newEmail || user.email
            user.password = newPassword || user.password
            res.status(200).send("Usuário editado com sucesso")
        } else {
            res.status(404).send("Usuário não encontrado")
        }
    } catch (error: any) {
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})

app.put("/product/:id", (req: Request, res: Response) => {
    try {
        const productId = req.params.id

        const newId = req.body.id
        const newName = req.body.name
        const newPrice = req.body.price
        const newCategory = req.body.category

        const product = products.find((product) => {
            return product.id === productId
        })
        const filterProduct = products.find((product) => {
            return product.id === newId
        })

        if (!product) {
            res.status(404)
            throw new Error("id do produto não encontrado");
        }
        if (newId !== undefined) {
            if (filterProduct) {
                res.status(400)
                throw new Error("id do produto ja existe");
            }
            if (typeof newId !== "string") {
                res.status(400)
                throw new Error("'id' deve ser uma string")
            }
        }


        if (newName !== undefined) {
            if (typeof newName !== "string") {
                res.status(400)
                throw new Error("O nome do produto deve ser uma string");
            }
        }


        if (newPrice !== undefined) {
            if (newPrice <= 0) {
                res.status(400)
                throw new Error("O preço do produto deve ser positivo");
            }
            if (typeof newPrice !== "number") {
                res.status(400)
                throw new Error("O preço do produto deve ser um number");
            }
        }

        if (newCategory !== undefined) {
            if (newCategory === undefined) {
                res.status(400)
                throw new Error("O produto deve ter uma categoria para ser cadastrado");
            }
            if (
                newCategory !== Category.ACCESSORIES &&
                newCategory !== Category.ELECTRONICS &&
                newCategory !== Category.PERIFERICS
            ) {
                res.status(400)
                throw new Error("A categoria do produto deve ser: Acessórios, Periféricos ou Eletrônicos")
            }
        }

        if (product) {
            product.id = newId || product.id
            product.name = newName || product.name
            product.price = newPrice || product.price
            product.category = newCategory || product.category
            res.status(200).send("Produto editado com sucesso")
        } else {
            res.status(404).send("Produto não encontrado")
        }
    } catch (error: any) {
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})
// import { users, products, purchases, createUsers, getAllUsers, createProduct, getAllProducts, getProductById, queryProductsByName, createPurchase, getAllPurchasesFromUserId } from "./database"
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

        const result = await db("users")

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

        const result = await db("products")

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

        const result = await db("purchases")

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

        const [result] = await db("products").where("name", "LIKE", `%${q}%`)

        if (!result) {
            res.status(404)
            throw new Error("Este produto não existe")
        }

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

app.post("/users", async (req: Request, res: Response) => {
    try {
        const { id, name, email, password, } = req.body as TUser

        const newUser = {
            id,
            name,
            email,
            password
        } as TUser

        const result = await db("users")

        const existingId = result.find((user: any) => {
            return user.id === newUser.id
        })
        const existingemail = result.find((user: any) => {
            return user.email === newUser.email
        })

        if (newUser.name === undefined) {
            res.status(400)
            throw new Error("Para criar um usuário é necessário um 'nome'")
        }
        if (newUser.name.length <= 4) {
            res.status(400)
            throw new Error("Nome precisa ter 4 ou mais letras")
        }
        if (typeof newUser.name !== "string") {
            res.status(400)
            throw new Error("Nome deve ser um texto")
        }
        if (newUser.name.match(/^[   0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/)) {
            res.status(400)
            throw new Error("Nome deve ter apenas letras normais")
        }

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

        await db("users").insert(newUser)

        res.status(201).send("Usuário cadastrado com sucesso")
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

app.post("/products", async (req: Request, res: Response) => {
    try {
        const { id, name, price, description, image_url } = req.body as TProduct

        const newProduct = {
            id,
            name,
            price,
            description,
            image_url
        } as TProduct

        const result = await db("products")

        const existingId = result.find((product: any) => {
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


        if (newProduct.description === undefined) {
            res.status(404)
            throw new Error("O produto deve ter uma descrição para ser cadastrado");
        }
        if (typeof newProduct.description !== "string") {
            res.status(400)
            throw new Error("A descrição do produto deve ser um texto");
        }

        if (newProduct.image_url === undefined) {
            res.status(404)
            throw new Error("O produto deve ter uma imagem para ser cadastrado");
        }
        if (typeof newProduct.image_url !== "string") {
            res.status(400)
            throw new Error("A imagem do produto deve ser um texto");
        }

        await db("products").insert(newProduct)

        res.status(201).send("Produto cadastrado com sucesso")
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

app.post("/purchases", async (req: Request, res: Response) => {
    try {
        const {id , buyer_id, product_id, quantity} = req.body

        const [products] = await db("products").where({id: product_id})

        if(!id || !buyer_id || !product_id){
            res.status(400)
            throw new Error("Id ou Comprador faltando")
        }

        if(typeof id !== "string" &&typeof buyer_id !== "string"){
            res.status(400)
            throw new Error("Id deve ser um texto")
        }

        const newPurchase = {
            id,
            buyer_id,
            total_price: products.price * quantity
        }

        const newPurchaseProduct = {
            purchase_id: id,
            product_id: product_id,
            quantity
        }

        const [findUser] = await db("users").where({id:newPurchase.buyer_id})

        if(findUser){
            await db("purchases").insert(newPurchase)
            await db("purchases_products").insert(newPurchaseProduct)
        }else{
            res.status(400)
            throw new Error("Ouve um erro na compra")
        }

        res.status(201).send("Compra realizada com sucesso")


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

app.get("/products/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string

        const [result] = await db("products").where({ id: id })

        if (!result) {
            res.status(400)
            throw new Error("Produto não encontrado")
        }

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

app.get("/users/:id/purchases", async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string

        const [user] = await db("users").where({ id: id })

        const result = await db("purchases").where({ buyer_id: id })

        if (!user) {
            res.status(404)
            throw new Error("Usuário não encotrado");
        }

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

app.delete("/user/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id

        if (id.length < 1) {
            res.status(400)
            throw new Error("insira um ID");
        }

        const [userExist] = await db("users").where({ id: id })

        if (userExist) {
            await db("users").del().where({ id: id })
            res.status(200).send("Usuário deletado com sucesso")
        } else {
            res.status(404)
            throw new Error("Usuário não encontrado");
        }

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

app.delete("/product/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string

        if (!id) {
            res.status(400)
            throw new Error("insira um ID");
        }

        const [productExist] = await db("products").where({ id: id })

        if (productExist) {
            await db("products").del().where({ id: id })
            res.status(200).send("Produto deletado com sucesso")
        } else {
            res.status(404)
            throw new Error("produto não encontrado");
        }

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

app.put("/user/:id", async (req: Request, res: Response) => {
    try {
        const userId = req.params.id as string

        const { id, name, email, password } = req.body as TUser

        const [user] = await db("users")

        const userTofilter = await db("users")


        if (!userTofilter.find((user) => user.id === userId)) {
            res.status(404)
            throw new Error("Usuário não encontrado")
        }

        if (name !== undefined) {
            if (name.length <= 4) {
                res.status(400)
                throw new Error("Nome precisa ter 4 ou mais letras")
            }
            if (typeof name !== "string") {
                res.status(400)
                throw new Error("Nome deve ser um texto")
            }
            if (!name.match(/[a-zA-Z\u00C0-\u00FF ]+/i)) {
                res.status(400)
                throw new Error("Nome não deve ter apenas letras normais")
            }
        }

        if (email !== undefined) {
            if (typeof email !== "string") {
                res.status(400)
                throw new Error("'Email' deve ser uma string")
            }
            if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
                throw new Error("Parâmetro 'email' inválido")
            }
            if (userTofilter.find((user) => user.email === email)) {
                res.status(422)
                throw new Error("Email já foi cadastrado")
            }
        }
        if (password !== undefined) {
            if (typeof password !== "string") {
                res.status(400)
                throw new Error("'Senha' deve ser uma string")
            }
            if (password.length <= 6) {
                res.status(400)
                throw new Error("Senha precisa ter mais de 6 caracteres")
            }
        }

        if (user) {
            const newUser = {
                name: name || user.name,
                email: email || user.email,
                password: password || user.password
            }
            await db("users").update(newUser).where({ id: userId })
            res.status(200).send("Usuário editado com sucesso")
        } else {
            res.status(404).send("Usuário não encontrado")
        }
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

app.put("/product/:id", async (req: Request, res: Response) => {
    try {
        const productId = req.params.id as string

        const { id, name, price, description, image_url } = req.body as TProduct

        const [product] = await db("products")

        const productExist = await db("products")

        if (!productExist.find((product: any) => product.id === productId)) {
            res.status(404)
            throw new Error("id do produto não encontrado");
        }
        if (id !== undefined) {
            if (typeof id !== "string") {
                res.status(400)
                throw new Error("'id' deve ser uma string")
            }
        }


        if (name !== undefined) {
            if (typeof name !== "string") {
                res.status(400)
                throw new Error("O nome do produto deve ser uma string");
            }
        }


        if (price !== undefined) {
            if (price <= 0) {
                res.status(400)
                throw new Error("O preço do produto deve ser positivo");
            }
            if (typeof price !== "number") {
                res.status(400)
                throw new Error("O preço do produto deve ser um number");
            }
        }

        if (description !== undefined) {
            if (typeof description !== "string") {
                res.status(400)
                throw new Error("A descrição do produto deve ser um texto");
            }
        }

        if (image_url === undefined) {
            if (typeof image_url !== "string") {
                res.status(400)
                throw new Error("A imagem do produto deve ser um texto");
            }
        }

        if (product) {
            const newProduct = {
                id: id || product.id,
                name: name || product.name,
                price: price || product.price,
                description: description || product.description,
                image_url: image_url || product.image_url
            }
            await db("products").update(newProduct).where({ id: productId })

            res.status(200).send("Produto editado com sucesso")
        } else {
            res.status(404).send("Produto não encontrado")
        }
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

app.get("/purchases/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string

        const compras = await db("purchases_products").select(
            "products.id as id",
            "products.name as name",
            "products.price as price",
            "products.description as description",
            "products.image_url as imageUrl",
            "purchases_products.quantity as quantity",
        ).innerJoin("products", "products.id", "=", "purchases_products.product_id").where({ purchase_id: id })
        const [result] = await db("purchases_products").select(
            "purchases_products.purchase_id as purchaseId",
            "purchases.buyer_id as buyerId",
            "users.name as buyerName",
            "users.email as buyerEmail",
            "purchases.total_price as totalPrice",
            "purchases.created_at as createdAt",
            "purchases.paid as paid"
        )
            .innerJoin("purchases", "purchases_products.purchase_id", "=", "purchases.id").innerJoin("users", "purchases.buyer_id", "=", "users.id").where({ purchaseId: id })

        if (result) {
            const newCar = {
                purchaseId: result.purchaseId,
                buyerId: result.buyerId,
                buyerName: result.buyerName,
                buyerEmail: result.buyerEmail,
                totalPrice: result.totalPrice,
                createdAt: result.createdAt,
                paid: result.paid === 0 ? "false" : "true",
                productsList: compras
            }
            res.status(200).send(newCar)
        } else {
            res.status(400)
            throw new Error("Compra não encontada");
        }
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
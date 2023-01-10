import { Category, TProduct, TPurchase, TUser } from "./types";


export function createUsers (id:string, email:string, password:string):string {
    users.push({id,email,password})
    return ("Cadastro registrado com sucesso")
}

export function getAllUsers ():TUser[]{
    return users
}

export function createProduct (id:string, name:string, price:number, category: Category):string{
    products.push({id,name,price,category})
    return ("Produto registrado com sucesso")
}
export function getAllProducts ():TProduct[]{
    return products
}

export function getProductById(productId:TProduct[], idOfProduct:string):TProduct[]{
    return productId.filter((product)=>{
        return product.id === idOfProduct
    })
}

export function queryProductsByName(nameOfProduct:string):TProduct[]{
     return products.filter((product)=>{
        return product.name.includes(nameOfProduct)
     })   
}

export function createPurchase(userId:string,productId: string,quantity: number,totalPrice: number):string{
    purchases.push({userId, productId, quantity, totalPrice})
    return ("Compra finalizada com sucesso")
}

export function getAllPurchasesFromUserId(userId:string):TPurchase[]{
    return purchases.filter((purchase)=>{
        return purchase.userId === userId
    })
}

export const users:TUser[] = [ 
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
    
]

export const products:TProduct[] = [ 
    {
        id: "1",
        name: "Mouse Razer",
        price: 250.00,
        category: Category.PERIFERICS
    },
    {
        id: "2",
        name: "Web Cam Sony",
        price: 340.50,
        category: Category.ELECTRONICS
    }
    
]

export const purchases:TPurchase[] = [ 
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
    
]

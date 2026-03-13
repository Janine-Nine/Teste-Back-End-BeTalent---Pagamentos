import {Request,Response} from "express"
import {db} from "../config/database"

export class ProductController{

static async list(req:Request,res:Response){

const [rows] = await db.query("SELECT * FROM products")

res.json(rows)

}

static async buy(req:Request,res:Response){

const {productId,quantity} = req.body

const [rows]:any = await db.query(
"SELECT * FROM products WHERE id=?",
[productId]
)

const product = rows[0]

if(!product)
return res.status(404).json({error:"Product not found"})

const total = product.price * quantity

res.json({
product:product.name,
quantity,
total
})

}

}
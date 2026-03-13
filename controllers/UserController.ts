import { Request, Response } from "express"
import bcrypt from "bcrypt"
import { connection } from "../database/connection"

export class UserController {

async create(req: Request, res: Response){

const { name, email, password, role } = req.body

const hashedPassword = await bcrypt.hash(password,10)

const [id] = await connection("users").insert({
name,
email,
password:hashedPassword,
role
})

return res.json({
id,
name,
email,
role
})

}

async list(req: Request, res: Response){

const users = await connection("users")
.select("id","name","email","role")

return res.json(users)

}

async show(req: Request, res: Response){

const { id } = req.params

const user = await connection("users")
.where({ id })
.first()

return res.json(user)

}

async update(req: Request, res: Response){

const { id } = req.params
const { name, email, role } = req.body

await connection("users")
.where({ id })
.update({
name,
email,
role
})

return res.json({
message:"User updated"
})

}

async delete(req: Request, res: Response){

const { id } = req.params

await connection("users")
.where({ id })
.delete()

return res.json({
message:"User deleted"
})

}

}
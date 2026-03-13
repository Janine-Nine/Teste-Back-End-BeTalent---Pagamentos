import {Request,Response} from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import {db} from "../config/database"

export class AuthController{

static async login(req:Request,res:Response){

const {email,password} = req.body

const [rows]:any = await db.query(
"SELECT * FROM users WHERE email=?",
[email]
)

const user = rows[0]

if(!user)
return res.status(401).json({error:"User not found"})

const valid = await bcrypt.compare(password,user.password)

if(!valid)
return res.status(401).json({error:"Invalid password"})

const token = jwt.sign(
{id:user.id},
process.env.JWT_SECRET as string,
{expiresIn:"1h"}
)

res.json({token})

}

}
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

import {UserRepository} from "../../infrastructure/repositories/UserRepository"

export class LoginUseCase{

async execute(email:string,password:string){

const repo = new UserRepository()

const user = await repo.findByEmail(email)

if(!user) throw new Error("User not found")

const valid = await bcrypt.compare(password,user.password)

if(!valid) throw new Error("Invalid password")

const token = jwt.sign(
{id:user.id},
process.env.JWT_SECRET as string,
{expiresIn:"1h"}
)

return token

}

}
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

const SECRET = "secret"

export class AuthService {

  generateToken(user:any){
    return jwt.sign(
      { id:user.id, role:user.role },
      SECRET,
      { expiresIn:"1d" }
    )
  }

  hashPassword(password:string){
    return bcrypt.hashSync(password,10)
  }

  compare(password:string,hash:string){
    return bcrypt.compareSync(password,hash)
  }

}
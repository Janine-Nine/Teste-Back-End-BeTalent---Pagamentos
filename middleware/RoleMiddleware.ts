import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext"

export function role(roles:string[]){

return (req,res,next)=>{

if(!roles.includes(req.user.role)){
return res.status(403).json({error:"forbidden"})
}

next()

}

}
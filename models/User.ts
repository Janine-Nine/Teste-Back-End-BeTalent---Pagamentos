import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm"

export default class User extends BaseModel{

  @column({isPrimary:true})
  id:number

  @column()
  name:string

  @column()
  email:string

  @column()
  password:string

  @column()
  role:string

}
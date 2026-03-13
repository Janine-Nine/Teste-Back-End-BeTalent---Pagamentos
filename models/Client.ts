import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm"

export default class Client extends BaseModel{

  @column({isPrimary:true})
  id:number

  @column()
  name:string

  @column()
  email:string

}
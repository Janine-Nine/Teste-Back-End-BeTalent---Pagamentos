import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm"

export default class Transaction extends BaseModel{

  @column({isPrimary:true})
  id:number

  @column()
  clientId:number

  @column()
  gateway:string

  @column()
  externalId:string

  @column()
  status:string

  @column()
  amount:number

}
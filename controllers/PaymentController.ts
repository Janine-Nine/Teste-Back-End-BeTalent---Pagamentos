import { Request,Response } from "express"
import { PaymentService } from "../services/PaymentService"

export class PaymentController{

 async purchase(req:Request,res:Response){

  const service = new PaymentService()

  try{

    const result = await service.processPayment(req.body)

    res.json(result)

  }catch{

    res.status(500).json({message:"payment failed"})

  }

 }

}
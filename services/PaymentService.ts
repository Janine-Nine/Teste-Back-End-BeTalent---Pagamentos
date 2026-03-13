import { ProductRepository } from "../repositories/ProductRepository"
import { GatewayService } from "./GatewayService"

export class PaymentService {

async execute(data:any){

const productRepo = new ProductRepository()

let total = 0

for(const item of data.products){

const product = await productRepo.findById(item.product_id)

total += product.amount * item.quantity

}

const gateway = new GatewayService()

const payment = await gateway.processPayment(total,data.client,data.card)

return payment

}

}
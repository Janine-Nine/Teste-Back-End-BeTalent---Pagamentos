import { BuyProductDTO } from "../dtos/BuyProductDTO"
import { ClientRepository } from "../../repositories/ClientRepository"
import { ProductRepository } from "../../repositories/ProductRepository"
import { TransactionRepository } from "../../repositories/TransactionRepository"
import { GatewayService } from "../../services/GatewayService"
import { Logger } from "../../infra/logger"

export class BuyProductUseCase {

  constructor(
    private clientRepo: ClientRepository,
    private productRepo: ProductRepository,
    private transactionRepo: TransactionRepository,
    private gatewayService: GatewayService
  ) {}

  async execute(data: BuyProductDTO){

    Logger.info("Starting purchase usecase")

    const client = await this.clientRepo.findById(data.clientId)

    if(!client) throw new Error("Client not found")

    let total = 0

    for(const item of data.products){

      const product = await this.productRepo.findById(item.productId)

      if(!product) throw new Error("Product not found")

      if(product.stock < item.quantity)
        throw new Error("Insufficient stock")

      total += product.price * item.quantity
    }

    Logger.info("Total calculated", total)

    const gatewayResponse =
      await this.gatewayService.processPayment({
        amount: total,
        cardNumber: data.cardNumber,
        cvv: data.cvv
      })

    if(!gatewayResponse.success)
      throw new Error("Payment refused")

    const transaction =
      await this.transactionRepo.create({
        clientId: data.clientId,
        amount: total,
        status: "APPROVED",
        gatewayId: gatewayResponse.gatewayId
      })

    for(const item of data.products){
      await this.productRepo.decreaseStock(
        item.productId,
        item.quantity
      )
    }

    Logger.info("Purchase finished")

    return transaction
  }
}
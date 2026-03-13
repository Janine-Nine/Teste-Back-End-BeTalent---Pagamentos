import { PaymentService } from "../../services/GatewayServices"

export class CreatePaymentUseCase {

  constructor(
    private paymentService: PaymentService
  ) {}

  async execute(data: any) {

    if (!data.amount || !data.cardNumber || !data.cvv) {
      throw new Error("Invalid payment data")
    }

    const paymentResult = await this.paymentService.processPayment(data)

    return {
      success: true,
      transactionId: paymentResult.id
    }

  }

}
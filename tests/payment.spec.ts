import { CreatePaymentUseCase } from "../application/useCases/CreatePaymentUseCase"
import { PaymentService } from "../services/GatewayServices"

describe("Create Payment Use Case", () => {

  it("should process payment successfully", async () => {

    const gatewayService = new PaymentService()

    const createPayment = new CreatePaymentUseCase(gatewayService)

    const paymentData = {
      amount: 1000,
      name: "Tester",
      email: "tester@email.com",
      cardNumber: "5569000000006063",
      cvv: "010"
    }

    const result = await createPayment.execute(paymentData)

    expect(result).toHaveProperty("success")

  })

})
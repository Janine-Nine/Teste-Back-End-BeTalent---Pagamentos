import { Router } from "express"
import { TransactionController } from "../controllers/TransactionController"
import { TransactionsRefund } from "../controllers/TransactionsRefund"
import { authMiddleware } from "../middlewares/auth"

const routes = Router()

const controller = new TransactionController()
const refundController = new TransactionsRefund()

routes.get("/transactions", authMiddleware, controller.list)
routes.get("/transactions/:id", authMiddleware, controller.detail)

routes.post(
  "/transactions/:id/refund",
  authMiddleware,
  refundController.refund
)

export default routes
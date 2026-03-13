import { Router } from "express"
import { GatewayController } from "../controllers/GatewayController"
import { authMiddleware } from "../middlewares/auth"

const routes = Router()
const controller = new GatewayController()

routes.patch("/gateways/:id/activate", authMiddleware, controller.activate)
routes.patch("/gateways/:id/priority", authMiddleware, controller.changePriority)

export default routes
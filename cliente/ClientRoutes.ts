import { Router } from "express"
import { ClientController } from "../controllers/ClientController"
import { authMiddleware } from "../middlewares/auth"

const routes = Router()
const controller = new ClientController()

routes.get("/clients", authMiddleware, controller.list)
routes.get("/clients/:id", authMiddleware, controller.detail)

export default routes
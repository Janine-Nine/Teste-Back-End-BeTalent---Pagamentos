import {Router} from "express"
import {ProductController} from "../controllers/ProductController"
import {authMiddleware} from "../middleware/authMiddleware"

const router = Router()

router.get("/products",authMiddleware,ProductController.list)

router.post("/buy",authMiddleware,ProductController.buy)

export default router
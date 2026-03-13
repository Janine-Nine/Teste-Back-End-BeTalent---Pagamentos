import express from "express"
import cors from "cors"

import authRoutes from "./routes/authRoutes"
import productRoutes from "./routes/productRoutes"

import swaggerUi from "swagger-ui-express"
import swaggerSpec from "./config/swagger"

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/auth",authRoutes)
app.use("/api",productRoutes)

app.use("/docs",swaggerUi.serve,swaggerUi.setup(swaggerSpec))

export default app
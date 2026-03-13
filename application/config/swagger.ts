import swaggerUi from "swagger-ui-express"
import swaggerJsDoc from "swagger-jsdoc"
import { Express } from "express"

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "BeTalent Payments API",
      version: "1.0.0",
      description: "API multi-gateway para gerenciamento de pagamentos"
    },
    servers: [
      {
        url: "http://localhost:3333"
      }
    ]
  },
  apis: ["./routes/*.ts"]
}

const swaggerSpec = swaggerJsDoc(options)

export function setupSwagger(app: Express) {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))
}
import winston from "winston"
import { Logger } from "./logger"

const { combine, timestamp, printf, colorize, json } = winston.format

// formato bonito para console
const logFormat = printf(({ level, message, timestamp, ...meta }) => {
  return `${timestamp} [${level}]: ${message} ${
    Object.keys(meta).length ? JSON.stringify(meta) : ""
  }`
})

export const logger = winston.createLogger({
  level: "info",

  format: combine(
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    json()
  ),

  transports: [

    // console
    new winston.transports.Console({
      format: combine(
        colorize(),
        timestamp({ format: "HH:mm:ss" }),
        logFormat
      )
    }),

    // arquivo geral
    new winston.transports.File({
      filename: "logs/app.log"
    }),

    // somente erros
    new winston.transports.File({
      filename: "logs/error.log",
      level: "error"
    })

  ]

})


// helper class (boa prática usar no projeto)
export class Logger {

  static info(message: string, data?: any) {
    logger.info(message, data)
  }

  static error(message: string, data?: any) {
    logger.error(message, data)
  }

  static warn(message: string, data?: any) {
    logger.warn(message, data)
  }

  static debug(message: string, data?: any) {
    logger.debug(message, data)
  }

  Logger.info("User logged in", { userId: 10 })

  Logger.error("Login failed", { email: "teste@email.com" })

}

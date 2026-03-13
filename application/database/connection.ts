import knex from "knex"

export const connection = knex({
  client: "mysql2",
  connection: {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "betalent_payments"
  },
  pool: {
    min: 0,
    max: 10
  }
})

import knex from "knex"

export const connection = knex({
  client: "mysql2",
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  }
})
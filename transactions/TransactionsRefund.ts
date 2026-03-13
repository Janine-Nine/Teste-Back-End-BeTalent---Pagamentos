import { Request, Response } from "express"
import { pool } from "../infra/mysql"

export class TransactionsRefund {

  async refund(req: Request, res: Response){

    const { id } = req.params

    const [trx]: any =
      await pool.query(
        "SELECT * FROM transactions WHERE id = ?",
        [id]
      )

    if(trx.length === 0)
      return res.status(404).json({error:"Transaction not found"})

    if(trx[0].status === "REFUNDED")
      return res.status(400).json({error:"Already refunded"})

    await pool.query(
      "UPDATE transactions SET status = 'REFUNDED' WHERE id = ?",
      [id]
    )

    await pool.query(
      "INSERT INTO refunds(transaction_id,status) VALUES(?,?)",
      [id,"DONE"]
    )

    return res.json({message:"Refund success"})
  }

}
import { pool } from "../infra/mysql"

export class RefundPaymentUseCase{

  async execute(id:number){

    const [trx]:any =
      await pool.query(
        "SELECT * FROM transactions WHERE id=?",
        [id]
      )

    if(trx.length===0)
      throw new Error("transaction not found")

    await pool.query(
      "UPDATE transactions SET status='REFUNDED' WHERE id=?",
      [id]
    )

    return {message:"refund done"}
  }

}
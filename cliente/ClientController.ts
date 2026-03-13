import { Request, Response } from "express"
import { pool } from "../infra/mysql"

export class ClientController {

  async list(req: Request, res: Response){
    const [rows] = await pool.query("SELECT * FROM clients")
    return res.json(rows)
  }

  async detail(req: Request, res: Response){

    const { id } = req.params

    const [rows]: any =
      await pool.query(
        "SELECT * FROM clients WHERE id = ?",
        [id]
      )

    if(rows.length === 0)
      return res.status(404).json({error:"Client not found"})

    return res.json(rows[0])
  }

}
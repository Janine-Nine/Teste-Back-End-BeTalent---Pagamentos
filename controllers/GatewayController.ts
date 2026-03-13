import { Request, Response } from "express"
import { pool } from "../infra/mysql"

export class GatewayController {

  async activate(req: Request, res: Response){

    const { id } = req.params

    await pool.query(
      "UPDATE gateways SET active = NOT active WHERE id = ?",
      [id]
    )

    return res.json({message:"Gateway status changed"})
  }

  async changePriority(req: Request, res: Response){

    const { id } = req.params
    const { priority } = req.body

    await pool.query(
      "UPDATE gateways SET priority = ? WHERE id = ?",
      [priority,id]
    )

    return res.json({message:"Priority updated"})
  }

}
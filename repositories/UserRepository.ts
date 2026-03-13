import { db } from "../../config/database"
import { IUserRepository } from "../../domain/repositories/IUserRepository"
import { UserRepository } from "@/repositories/UserRepository"

export class UserRepository implements IUserRepository {

  async create(user: any): Promise<any> {

    const query = `
      INSERT INTO users (name, email, password, role)
      VALUES (?, ?, ?, ?)
    `

    const [result]: any = await db.execute(query, [
      user.name,
      user.email,
      user.password,
      user.role
    ])

    return {
      id: result.insertId,
      ...user
    }

  }

  async findByEmail(email: string): Promise<any> {

    const query = `
      SELECT * FROM users
      WHERE email = ?
    `

    const [rows]: any = await db.execute(query, [email])

    return rows[0]

  }

  async findById(id: number): Promise<any> {

    const query = `
      SELECT * FROM users
      WHERE id = ?
    `

    const [rows]: any = await db.execute(query, [id])

    return rows[0]

  }

  async list(): Promise<any[]> {

    const query = `
      SELECT id, name, email, role
      FROM users
    `

    const [rows]: any = await db.execute(query)

    return rows

  }

  async update(id: number, data: any): Promise<any> {

    const query = `
      UPDATE users
      SET name = ?, email = ?, role = ?
      WHERE id = ?
    `

    await db.execute(query, [
      data.name,
      data.email,
      data.role,
      id
    ])

    return this.findById(id)

  }

  async delete(id: number): Promise<void> {

    const query = `
      DELETE FROM users
      WHERE id = ?
    `

    await db.execute(query, [id])

  }

}
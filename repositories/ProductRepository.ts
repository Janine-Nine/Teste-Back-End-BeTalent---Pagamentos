import { db } from "../../config/database"
import { IProductRepository } from "../../domain/repositories/IProductRepository"

export class ProductRepository implements IProductRepository {

  async create(product: any): Promise<any> {

    const query = `
      INSERT INTO products (name, price)
      VALUES (?, ?)
    `

    const [result]: any = await db.execute(query, [
      product.name,
      product.price
    ])

    return {
      id: result.insertId,
      ...product
    }

  }

  async findById(id: number): Promise<any> {

    const query = `
      SELECT *
      FROM products
      WHERE id = ?
    `

    const [rows]: any = await db.execute(query, [id])

    return rows[0]

  }

  async list(): Promise<any[]> {

    const query = `
      SELECT *
      FROM products
    `

    const [rows]: any = await db.execute(query)

    return rows

  }

  async update(id: number, data: any): Promise<any> {

    const query = `
      UPDATE products
      SET name = ?, price = ?
      WHERE id = ?
    `

    await db.execute(query, [
      data.name,
      data.price,
      id
    ])

    return this.findById(id)

  }

  async delete(id: number): Promise<void> {

    const query = `
      DELETE FROM products
      WHERE id = ?
    `

    await db.execute(query, [id])

  }

}
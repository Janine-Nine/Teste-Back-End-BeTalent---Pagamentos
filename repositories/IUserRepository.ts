export interface IUserRepository {

  findByEmail(email: string): Promise<any>

  create(user: any): Promise<any>

  findById(id: number): Promise<any>

  list(): Promise<any[]>

  update(id: number, data: any): Promise<any>

  delete(id: number): Promise<void>

}
export interface ITransactionRepository {

  create(transaction: any): Promise<any>

  findById(id: number): Promise<any>

  list(): Promise<any[]>

  updateStatus(id: number, status: string): Promise<any>

}
export interface GatewayInterface {

login(): Promise<void>

createTransaction(data:any):Promise<any>

refund(id:string):Promise<any>

}
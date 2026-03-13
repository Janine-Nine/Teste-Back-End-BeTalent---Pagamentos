import axios from "axios"

export class GatewayService {

async processPayment(amount:number,client:any,card:any){

try{

const response = await axios.post(
"http://localhost:3001/transactions",
{
amount,
name:client.name,
email:client.email,
cardNumber:card.number,
cvv:card.cvv
})

return {
gateway:"gateway1",
transaction:response.data
}

}catch{

const response = await axios.post(
"http://localhost:3002/transacoes",
{
valor:amount,
nome:client.name,
email:client.email,
numeroCartao:card.number,
cvv:card.cvv
})

return {
gateway:"gateway2",
transaction:response.data
}

}

}

}
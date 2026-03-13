import axios from "axios"

export default class Gateway1{

 async charge(data:any){

  const login = await axios.post(
    "http://localhost:3001/login",
    {
      email:"dev@betalent.tech",
      token:"FEC9BB078BF338F464F96B48089EB498"
    }
  )

  const token = login.data.token

  const res = await axios.post(
    "http://localhost:3001/transactions",
    {
      amount:data.amount,
      name:data.name,
      email:data.email,
      cardNumber:data.cardNumber,
      cvv:data.cvv
    },
    {
      headers:{ Authorization:`Bearer ${token}` }
    }
  )

  return { success:true, id:res.data.id }

 }

}
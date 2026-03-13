const API = "http://localhost:3000"

let token = ""

async function checkApi(){

const res = await fetch(API + "/status")

const data = await res.json()

document.getElementById("status").textContent =
JSON.stringify(data,null,2)

}

async function login(){

const email = document.getElementById("email").value
const password = document.getElementById("password").value

const res = await fetch(API + "/login",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({email,password})

})

const data = await res.json()

token = data.token

document.getElementById("loginResponse").textContent =
JSON.stringify(data,null,2)

}

async function listarProdutos(){

const res = await fetch(API + "/products")

const data = await res.json()

document.getElementById("produtos").textContent =
JSON.stringify(data,null,2)

}

async function comprar(){

const clientId = document.getElementById("clientId").value
const productId = document.getElementById("productId").value
const quantity = document.getElementById("quantity").value
const cardNumber = document.getElementById("cardNumber").value
const cvv = document.getElementById("cvv").value

const res = await fetch(API + "/purchase",{

method:"POST",

headers:{
"Content-Type":"application/json",
"Authorization":"Bearer " + token
},

body:JSON.stringify({
clientId,
products:[
{
productId,
quantity
}
],
cardNumber,
cvv
})

})

const data = await res.json()

document.getElementById("purchaseResponse").textContent =
JSON.stringify(data,null,2)

}

async function listarClientes(){

const res = await fetch(API + "/clients",{

headers:{
Authorization:"Bearer " + token
}

})

const data = await res.json()

document.getElementById("clientes").textContent =
JSON.stringify(data,null,2)

}

async function detalheCliente(){

const id = document.getElementById("clientDetailId").value

const res = await fetch(API + "/clients/" + id,{
headers:{Authorization:"Bearer " + token}
})

const data = await res.json()

document.getElementById("clientes").textContent =
JSON.stringify(data,null,2)

}

async function listarTransacoes(){

const res = await fetch(API + "/transactions",{

headers:{Authorization:"Bearer " + token}

})

const data = await res.json()

document.getElementById("transactions").textContent =
JSON.stringify(data,null,2)

}

async function detalheTransacao(){

const id = document.getElementById("transactionId").value

const res = await fetch(API + "/transactions/" + id,{

headers:{Authorization:"Bearer " + token}

})

const data = await res.json()

document.getElementById("transactions").textContent =
JSON.stringify(data,null,2)

}

async function refund(){

const id = document.getElementById("refundId").value

const res = await fetch(API + "/transactions/" + id + "/refund",{

method:"POST",

headers:{Authorization:"Bearer " + token}

})

const data = await res.json()

document.getElementById("refundResponse").textContent =
JSON.stringify(data,null,2)

}

async function ativarGateway(){

const id = document.getElementById("gatewayId").value

const res = await fetch(API + "/gateways/" + id + "/activate",{

method:"PATCH",

headers:{Authorization:"Bearer " + token}

})

const data = await res.json()

document.getElementById("gatewayResponse").textContent =
JSON.stringify(data,null,2)

}

async function alterarPrioridade(){

const id = document.getElementById("gatewayId").value
const priority = document.getElementById("priority").value

const res = await fetch(API + "/gateways/" + id + "/priority",{

method:"PATCH",

headers:{
"Content-Type":"application/json",
Authorization:"Bearer " + token
},

body:JSON.stringify({priority})

})

const data = await res.json()

document.getElementById("gatewayResponse").textContent =
JSON.stringify(data,null,2)

}
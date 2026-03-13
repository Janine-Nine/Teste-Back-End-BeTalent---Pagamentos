export class CreatePurchaseUseCase{

async execute(data){

let total = 0

for(const item of data.products){

const product = await productRepository.findById(item.productId)

total += product.price * item.quantity

}

const gateways = await gatewayRepository.findActiveOrdered()

let transaction = null

for(const gateway of gateways){

try{

const provider = GatewayFactory.create(gateway.name)

const result = await provider.createTransaction({
amount:total,
name:data.name,
email:data.email,
cardNumber:data.cardNumber,
cvv:data.cvv
})

transaction = await transactionRepository.create({
clientId:data.clientId,
gatewayId:gateway.id,
externalId:result.id,
amount:total,
status:"SUCCESS"
})

break

}catch{

continue

}

}

if(!transaction)
throw new Error("All gateways failed")

return transaction

}

}
async createPurchase(data){

let total = 0

for(const item of data.products){

 const product = await productRepository.findById(item.productId)

 total += product.price * item.quantity

}

const gateways = await gatewayRepository.findActiveOrdered()

let transaction = null

for(const gateway of gateways){

 try{

   const result = await gatewayService.process(gateway,data,total)

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

for(const item of data.products){

 await transactionProductRepository.create({
   transactionId:transaction.id,
   productId:item.productId,
   quantity:item.quantity
 })

}

return transaction
}
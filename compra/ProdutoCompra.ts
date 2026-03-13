await transactionProductRepository.create({
 transactionId:transaction.id,
 productId:data.productId,
 quantity:data.quantity
})
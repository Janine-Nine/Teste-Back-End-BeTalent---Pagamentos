async refund(transactionId){

const transaction = await transactionRepository.findById(transactionId)

const gateway = await gatewayRepository.findById(transaction.gatewayId)

await gatewayService.refund(gateway,transaction.externalId)

await transactionRepository.updateStatus(transactionId,"REFUNDED")

return {success:true}

}
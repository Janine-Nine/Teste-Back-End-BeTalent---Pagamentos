async getClientDetails(req,res){

const id = req.params.id

const client = await clientRepository.findById(id)

const purchases = await transactionRepository.findByClient(id)

res.json({
client,
purchases
})

}
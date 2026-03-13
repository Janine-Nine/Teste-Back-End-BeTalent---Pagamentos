it("should try gateway2 if gateway1 fails", async () => {

mockGateway1Fail()

mockGateway2Success()

const result = await purchaseUseCase.execute(data)

expect(result.status).toBe("SUCCESS")

})
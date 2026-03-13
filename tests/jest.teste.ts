describe("Login",()=>{

it("should generate token",async()=>{

const token = await loginUseCase.execute(
"admin@email.com",
"123456"
)

expect(token).toBeDefined()

})

})
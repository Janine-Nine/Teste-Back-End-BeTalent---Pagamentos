import request from "supertest"
import app from "../src/server"

describe("Payment flow", () => {

it("should create payment", async () => {

const res = await request(app)
.post("/purchase")
.send({
client:{name:"Teste",email:"teste@email.com"},
products:[
{product_id:1,quantity:1}
],
card:{
number:"5569000000006063",
cvv:"010"
}
})

expect(res.statusCode).toBe(200)

})

})
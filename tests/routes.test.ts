import request from "supertest"
import app from "../server"

describe("API Routes", () => {

  it("POST /purchase", async () => {

    const response = await request(app)
      .post("/purchase")
      .send({
        amount:1000,
        name:"tester",
        email:"tester@email.com",
        cardNumber:"5569000000006063",
        cvv:"010"
      })

    expect(response.status).toBe(200)

  })

})
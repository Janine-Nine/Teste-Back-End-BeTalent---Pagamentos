import request from "supertest"
import app from "../src/app"

describe("Auth",()=>{

it("should login",async()=>{

const res = await request(app)
.post("/api/auth/login")
.send({
email:"admin@email.com",
password:"123456"
})

expect(res.statusCode).toBe(200)

})

})
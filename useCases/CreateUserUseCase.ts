import { UserRepository } from "../../infrastructure/repositories/UserRepository"

const repo = new UserRepository()

await repo.create({
  name: "Janine",
  email: "janine@email.com",
  password: "123456",
  role: "ADMIN"
})
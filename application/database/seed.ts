import bcrypt from "bcrypt"
import { connection } from "./connection"

export async function seedUsers() {

const adminPass = await bcrypt.hash("admin123",10)

await connection("users").insert([
{
name:"Admin",
email:"admin@betalent.com",
password:adminPass,
role:"ADMIN"
},
{
name:"Manager",
email:"manager@betalent.com",
password:adminPass,
role:"MANAGER"
},
{
name:"Finance",
email:"finance@betalent.com",
password:adminPass,
role:"FINANCE"
},
{
name:"User",
email:"user@betalent.com",
password:adminPass,
role:"USER"
}
])

console.log("🌱 Users seeded")

}
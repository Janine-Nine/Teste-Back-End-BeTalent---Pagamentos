import { redis } from "../infra/redis"

export async function getProductCache(id:number){
  const cache = await redis.get("product:"+id)
  return cache ? JSON.parse(cache) : null
}

export async function setProductCache(id:number,data:any){
  await redis.set("product:"+id,JSON.stringify(data),"EX",60)
}
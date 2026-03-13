export class GatewayFactory{

static create(name:string){

switch(name){

case "gateway1":
return new Gateway1()

case "gateway2":
return new Gateway2()

default:
throw new Error("Gateway not supported")

}

}

}
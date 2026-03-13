export interface BuyProductItemDTO {
  productId: number
  quantity: number
}

export interface BuyProductDTO {
  clientId: number
  products: BuyProductItemDTO[]
  cardNumber: string
  cvv: string
}
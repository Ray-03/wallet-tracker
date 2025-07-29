import { defineStore } from 'pinia'

export interface LineItem {
  id: number
  title: string
  price: number
  image: string
  quantity: number
}

export interface CartState {
  items: LineItem[]
}

export const useCartStore = defineStore('cart', {})

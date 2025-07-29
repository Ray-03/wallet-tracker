import { defineStore } from 'pinia'
import type { Product } from '@/components/types'

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

export const useCartStore = defineStore('cart', {
  state: (): CartState => ({
    items: [],
  }),
})

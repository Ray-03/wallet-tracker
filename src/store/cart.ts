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
  items: { [id: number]: LineItem }
}

export const useCartStore = defineStore('cart', {
  state: (): CartState => ({
    items: {},
  }),
  getters: {
    itemsArray: (state) => Object.values(state.items),
  },
  actions: {
    addItem(product: Product, quantity: number = 1) {
      const existing = this.items[product.id]
      if (existing) {
        this.items[product.id] = { ...existing, quantity: existing.quantity + quantity }
      } else {
        this.items[product.id] = {
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          quantity,
        }
      }
      this.saveCart()
    },
    removeItem(productId: number) {
      if (this.items[productId]) {
        delete this.items[productId]
        this.saveCart()
      }
    },
    updateQuantity(productId: number, quantity: number) {
      const item = this.items[productId]
      if (item && quantity > 0) {
        this.items[productId] = { ...item, quantity }
      } else if (item && quantity <= 0) {
        this.removeItem(productId)
      }
      this.saveCart()
    },
    clearCart() {
      this.items = {}
      this.saveCart()
    },
    saveCart() {
      localStorage.setItem('cart_items', JSON.stringify(this.items))
    },
    loadCart() {
      const saved = localStorage.getItem('cart_items')
      if (saved) {
        this.items = JSON.parse(saved)
      }
    },
  },
})

import { defineStore } from 'pinia'
import type { CartState, Product } from '@/types'
import { cartStorage } from '@/utils/storage'

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
          ...product,
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
      cartStorage.save(this.items)
    },
    loadCart() {
      const saved = cartStorage.load<CartState['items']>()
      if (saved) {
        this.items = saved
      }
    },
  },
})

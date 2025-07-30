import { defineStore } from 'pinia'
import type { Product, ProductsState } from '../components/types'
import { apiRequest } from '@/backend/api'
import { type WalletError } from '@/utils/errors'

const API_URL = 'https://fakestoreapi.com/products'

export const useProductsStore = defineStore('products', {
  state: (): ProductsState => ({
    products: [],
    product: null,
    loading: false,
    error: null,
  }),
  actions: {
    setLoading(loading: boolean) {
      this.loading = loading
    },
    setError(error: WalletError | null) {
      this.error = error
    },
    async getAllProducts() {
      const res = await apiRequest<Product[]>(
        { method: 'get', url: API_URL },
        { setLoading: this.setLoading, setError: this.setError },
      )
      if (res) this.products = res.data
    },
    async getProductById(id: number) {
      const res = await apiRequest<Product>(
        { method: 'get', url: `${API_URL}/${id}` },
        { setLoading: this.setLoading, setError: this.setError },
      )
      if (res) this.product = res.data
    },
    async addProduct(product: Omit<Product, 'id'>) {
      const res = await apiRequest<Product>(
        { method: 'post', url: API_URL, data: product },
        { setLoading: this.setLoading, setError: this.setError },
      )
      if (res) this.products.push(res.data)
    },
    async updateProduct(id: number, product: Partial<Product>) {
      const res = await apiRequest<Product>(
        {
          method: 'put',
          url: `${API_URL}/${id}`,
          data: product,
        },
        { setLoading: this.setLoading, setError: this.setError },
      )
      if (res) {
        const idx = this.products.findIndex((p) => p.id === id)
        if (idx !== -1) this.products[idx] = res.data
      }
    },
    async deleteProduct(id: number) {
      const res = await apiRequest(
        { method: 'delete', url: `${API_URL}/${id}` },
        { setLoading: this.setLoading, setError: this.setError },
      )
      if (res) this.products = this.products.filter((p) => p.id !== id)
    },
  },
})

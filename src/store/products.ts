import { defineStore } from 'pinia'
import type { Product, ProductsState } from '@/types'
import { apiRequest } from '@/backend/api'
import { type WalletError } from '@/utils/errors'
import { API_CONFIG } from '@/constants'

export const useProductsStore = defineStore('products', {
  state: (): ProductsState => ({
    products: [],
    filteredProducts: [],
    product: null,
    loading: false,
    error: null,
    searchQuery: '',
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
        { method: 'get', url: `${API_CONFIG.BASE_URL}${API_CONFIG.PRODUCTS_ENDPOINT}` },
        { setLoading: this.setLoading, setError: this.setError },
      )
      if (res) {
        this.products = res.data
        this.filterProducts()
      }
    },
    searchProducts(query: string) {
      this.searchQuery = query
      this.filterProducts()
    },
    filterProducts() {
      if (!this.searchQuery.trim()) {
        this.filteredProducts = this.products
      } else {
        const query = this.searchQuery.toLowerCase()
        this.filteredProducts = this.products.filter(
          (product) =>
            product.title.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query) ||
            product.category.toLowerCase().includes(query),
        )
      }
    },
    async getProductById(id: number) {
      const res = await apiRequest<Product>(
        { method: 'get', url: `${API_CONFIG.BASE_URL}${API_CONFIG.PRODUCTS_ENDPOINT}/${id}` },
        { setLoading: this.setLoading, setError: this.setError },
      )
      if (res) this.product = res.data
    },
    async addProduct(product: Omit<Product, 'id'>) {
      const res = await apiRequest<Product>(
        {
          method: 'post',
          url: `${API_CONFIG.BASE_URL}${API_CONFIG.PRODUCTS_ENDPOINT}`,
          data: product,
        },
        { setLoading: this.setLoading, setError: this.setError },
      )
      if (res) this.products.push(res.data)
    },
    async updateProduct(id: number, product: Partial<Product>) {
      const res = await apiRequest<Product>(
        {
          method: 'put',
          url: `${API_CONFIG.BASE_URL}${API_CONFIG.PRODUCTS_ENDPOINT}/${id}`,
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
        { method: 'delete', url: `${API_CONFIG.BASE_URL}${API_CONFIG.PRODUCTS_ENDPOINT}/${id}` },
        { setLoading: this.setLoading, setError: this.setError },
      )
      if (res) this.products = this.products.filter((p) => p.id !== id)
    },
  },
})

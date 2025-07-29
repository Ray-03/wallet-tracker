<script setup lang="ts">
import { useProductsStore } from '@/store/products'
import ProductCard from './ProductCard.vue'

const store = useProductsStore()

await store.getAllProducts()
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <div v-if="store.error" class="text-center py-8">
      <div class="mb-4">
        <svg
          class="mx-auto h-12 w-12 text-red-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
          />
        </svg>
      </div>
      <h3 class="text-lg font-medium text-gray-900 mb-2">Failed to load products</h3>
      <p class="text-gray-600 mb-4">{{ store.error }}</p>
      <button
        @click="store.getAllProducts()"
        class="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
      >
        Try Again
      </button>
    </div>

    <div
      v-else-if="store.products.length"
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      <ProductCard v-for="product in store.products" :key="product.id" :product="product" />
    </div>

    <div v-else class="text-center py-8">
      <p class="text-gray-600 text-lg">No products found.</p>
    </div>
  </div>
</template>

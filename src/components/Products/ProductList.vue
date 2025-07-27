<script setup lang="ts">
import { useProductsStore } from '@/store/products'
import ProductCard from './ProductCard.vue'

const store = useProductsStore()

await store.getAllProducts()
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <div v-if="store.loading" class="text-center py-8">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      <p class="mt-2 text-gray-600">Loading products...</p>
    </div>

    <div v-else-if="store.error" class="text-center py-8">
      <p class="text-red-600">{{ store.error }}</p>
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

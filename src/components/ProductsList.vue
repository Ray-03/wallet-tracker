<script setup lang="ts">
import { useProductsStore } from '@/store/products'

const store = useProductsStore()

await store.getAllProducts()
</script>

<template>
  <div>
    <ul v-if="store.products.length">
      <li v-for="product in store.products" :key="product.id">
        {{ product.title }}
      </li>
    </ul>
    <div v-else>No products found.</div>
  </div>
</template>

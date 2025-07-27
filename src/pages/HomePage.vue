<script setup lang="ts">
import ProductList from '@/components/Products/ProductList.vue'
</script>

<template>
  <Suspense>
    <template #default>
      <ProductList />
    </template>
    <template #fallback>
      <div class="p-4 text-center">Loading products...</div>
    </template>
  </Suspense>
</template>

<script setup lang="ts">
import ProductsList from '@/components/ProductsList.vue'
</script>

<template>
  <Suspense>
    <template #default>
      <ProductsList />
    </template>
    <template #fallback>
      <div class="p-4 text-center">Loading products...</div>
    </template>
  </Suspense>
</template>

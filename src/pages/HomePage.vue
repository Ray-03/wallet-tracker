<script setup lang="ts">
import ProductList from '@/components/Products/ProductList.vue'
import ProductCard from '@/components/Products/ProductCard.vue'
</script>

<template>
  <Suspense>
    <template #default>
      <ProductList />
    </template>
    <template #fallback>
      <div class="container mx-auto px-4 py-8">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <ProductCard v-for="index in 8" :key="index" :loading="true" />
        </div>
      </div>
    </template>
  </Suspense>
</template>

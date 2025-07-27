<script setup lang="ts">
import type { Product } from '../types'
import CardHeader from './CardHeader.vue'
import CardBody from './CardBody.vue'

interface Props {
  product: Product
}

defineProps<Props>()
</script>

<template>
  <div
    class="bg-white rounded-lg border-t-2 border-primary shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
  >
    <CardHeader :alt="product.title" :image="product.image" />
    <CardBody :category="product.category" :price="product.price" :title="product.title" />
  </div>
</template>

<script setup lang="ts">
import type { Product } from '../types'
import CardHeader from './CardHeader.vue'
import CardBody from './CardBody.vue'

interface Props {
  product: Product
}

interface Emits {
  (e: 'click', product: Product): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const handleClick = () => {
  emit('click', props.product)
}
</script>

<template>
  <div
    class="bg-white rounded-lg border-y-4 border-primary shadow-md hover:shadow-xl transition-shadow duration-300 group cursor-pointer"
    role="button"
    tabindex="0"
    :aria-label="`View details for ${product.title}`"
    @click="handleClick"
    @keydown.enter="handleClick"
    @keydown.space.prevent="handleClick"
  >
    <CardHeader :alt="product.title" :image="product.image" />
    <CardBody :category="product.category" :price="product.price" :title="product.title" />
  </div>
</template>

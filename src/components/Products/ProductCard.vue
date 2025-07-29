<script setup lang="ts">
import type { Product } from '../types'
import CardHeader from './CardHeader.vue'
import CardBody from './CardBody.vue'

interface Props {
  product?: Product
  loading?: boolean
}

interface Emits {
  (e: 'click', product: Product): void
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
})
const emit = defineEmits<Emits>()

const handleClick = () => {
  if (props.product && !props.loading) {
    emit('click', props.product)
  }
}
</script>

<template>
  <div
    class="bg-white rounded-lg border-y-4 shadow-md transition-shadow duration-300 group cursor-pointer"
    :class="[loading ? 'border-gray-200' : 'border-primary hover:shadow-xl']"
    role="button"
    tabindex="0"
    :aria-label="loading ? 'Loading product' : `View details for ${product?.title}`"
    @click="handleClick"
    @keydown.enter="handleClick"
    @keydown.space.prevent="handleClick"
  >
    <CardHeader :loading="loading" :alt="product?.title" :image="product?.image" />
    <CardBody
      :loading="loading"
      :category="product?.category"
      :price="product?.price"
      :title="product?.title"
    />
  </div>
</template>

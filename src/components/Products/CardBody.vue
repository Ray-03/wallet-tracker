<script setup lang="ts">
import type { Product } from '../types'
import CartAction from './CartAction.vue'

interface Props {
  product: Product
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
})
const { category, price, title } = props.product
</script>

<template>
  <div class="p-4 bg-secondary flex flex-col gap-2 h-full">
    <template v-if="loading">
      <div>
        <div class="inline-block h-6 w-20 rounded-full skeleton-shimmer"></div>
      </div>

      <div class="space-y-2 flex-1">
        <div class="h-5 rounded w-full skeleton-shimmer"></div>
        <div class="h-5 rounded w-3/4 skeleton-shimmer"></div>
      </div>

      <div class="flex justify-between items-center">
        <div class="h-6 rounded w-16 skeleton-shimmer"></div>
        <div class="h-8 rounded w-24 skeleton-shimmer"></div>
      </div>
    </template>

    <template v-else-if="title && price !== undefined && category">
      <div>
        <span
          class="inline-block bg-primary-100 text-primary-700 text-xs px-2 py-1 rounded-full font-medium"
        >
          {{ category }}
        </span>
      </div>

      <h3 class="text-base font-semibold text-gray-900 line-clamp-2 flex-1">
        {{ title }}
      </h3>

      <div class="flex justify-between items-center">
        <span class="text-lg font-bold text-green-600 flex-shrink-0">${{ price.toFixed(2) }}</span>
        <CartAction :product="props.product" />
      </div>
    </template>
  </div>
</template>

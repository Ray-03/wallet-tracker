<script setup lang="ts">
import type { Product } from '../types'

interface Props {
  product: Product
}

defineProps<Props>()
</script>

<template>
  <div
    class="bg-white rounded-lg border-t-2 border-primary shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
  >
    <div class="aspect-square overflow-hidden outline-double outline-primary">
      <picture>
        <source media="(min-width: 768px)" :srcset="product.image" />
        <source media="(min-width: 480px)" :srcset="product.image" />
        <img
          :src="product.image"
          :alt="product.title"
          class="w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
          decoding="async"
        />
      </picture>
    </div>

    <div class="p-4 bg-secondary h-full">
      <div class="mb-2">
        <span
          class="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium"
        >
          {{ product.category }}
        </span>
      </div>

      <h3 class="text-lg font-semibold text-gray-900 mb-2">
        {{ product.title }}
      </h3>

      <p class="text-gray-600 text-sm mb-3 line-clamp-3">
        {{ product.description }}
      </p>

      <div class="flex items-center justify-between">
        <span class="text-xl font-bold text-green-600"> ${{ product.price.toFixed(2) }} </span>

        <div class="flex gap-2">
          <button
            class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm font-medium transition-colors"
          >
            Add to Cart
          </button>
          <button
            class="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-md text-sm font-medium transition-colors"
          >
            Details
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

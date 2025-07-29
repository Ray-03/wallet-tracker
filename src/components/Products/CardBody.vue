<script setup lang="ts">
interface Props {
  title?: string
  price?: number
  category?: string
  loading?: boolean
}

withDefaults(defineProps<Props>(), {
  loading: false,
})
</script>

<template>
  <div class="p-4 bg-secondary flex flex-col gap-2 h-full max-h-40 overflow-hidden">
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
          class="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium"
        >
          {{ category }}
        </span>
      </div>

      <h3 class="text-lg font-semibold text-gray-900 line-clamp-2 flex-shrink-0 flex-1">
        {{ title }}
      </h3>

      <div class="flex justify-between">
        <span class="text-xl font-bold text-green-600 flex-shrink-0">${{ price.toFixed(2) }}</span>
        <button
          class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm font-medium transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </template>
  </div>
</template>

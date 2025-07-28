<script setup lang="ts">
interface Props {
  title: string
  price: number
  category: string
}

defineProps<Props>()
</script>

<template>
  <div class="p-4 bg-secondary flex flex-col gap-2 h-full max-h-48 overflow-hidden">
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

    <div class="text-xl font-bold text-green-600 flex-shrink-0">${{ price.toFixed(2) }}</div>

    <div class="flex justify-between">
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
</template>

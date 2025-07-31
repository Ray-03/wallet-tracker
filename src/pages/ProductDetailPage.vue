<script setup lang="ts">
import { onMounted, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProductsStore } from '@/store/products'
import ErrorDisplay from '@/components/ErrorDisplay.vue'
import CartAction from '@/components/Products/CartAction.vue'
import { formatCurrency } from '@/utils/ui'
import { ROUTES } from '@/constants'

const route = useRoute()
const router = useRouter()
const productsStore = useProductsStore()

const productId = computed(() => {
  const id = route.params.id
  return typeof id === 'string' ? parseInt(id, 10) : Array.isArray(id) ? parseInt(id[0], 10) : id
})

const product = computed(() => productsStore.product)
const loading = computed(() => productsStore.loading)
const error = computed(() => productsStore.error)

onMounted(async () => {
  if (productId.value && !isNaN(productId.value)) {
    await productsStore.getProductById(productId.value)
  } else {
    router.push(ROUTES.HOME)
  }
})

// Watch for route changes to handle navigation between products
watch(productId, async (newId) => {
  if (newId && !isNaN(newId)) {
    await productsStore.getProductById(newId)
  }
})

const goBack = () => {
  router.back()
}
</script>

<template>
  <div class="px-4">
    <button
      @click="goBack"
      class="mb-6 flex items-center text-primary-600 hover:text-primary-700 transition-colors"
    >
      <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
      Back to Products
    </button>
    <div v-if="error" class="text-center py-8">
      <div class="mb-4">
        <svg
          class="mx-auto h-12 w-12 text-red-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
          />
        </svg>
      </div>
      <h3 class="text-lg font-medium text-gray-900 mb-2">Failed to load product</h3>
      <ErrorDisplay :error="error" :dismissible="false" />
      <button
        @click="productsStore.getProductById(productId)"
        class="mt-4 bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
      >
        Try Again
      </button>
    </div>

    <div v-else-if="loading" class="max-w-4xl mx-auto">
      <div class="bg-white rounded-lg shadow-lg overflow-hidden">
        <div class="md:flex">
          <div class="md:w-1/2">
            <div class="h-96 bg-gray-200 skeleton-shimmer"></div>
          </div>
          <div class="md:w-1/2 p-8">
            <div class="space-y-4">
              <div class="h-8 bg-gray-200 rounded skeleton-shimmer"></div>
              <div class="h-6 bg-gray-200 rounded w-24 skeleton-shimmer"></div>
              <div class="space-y-2">
                <div class="h-4 bg-gray-200 rounded skeleton-shimmer"></div>
                <div class="h-4 bg-gray-200 rounded w-3/4 skeleton-shimmer"></div>
                <div class="h-4 bg-gray-200 rounded w-1/2 skeleton-shimmer"></div>
              </div>
              <div class="h-12 bg-gray-200 rounded skeleton-shimmer"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else-if="product" class="max-w-4xl mx-auto border-primary-900 border-y-2 rounded-lg">
      <div class="bg-white rounded-lg shadow-lg overflow-hidden">
        <div class="md:flex">
          <div class="md:w-1/2">
            <img :src="product.image" :alt="product.title" class="w-full h-96 object-contain p-8" />
          </div>

          <div class="md:w-1/2 p-8">
            <div class="space-y-4">
              <div>
                <span
                  class="inline-block bg-primary-100 text-primary-700 text-sm px-3 py-1 rounded-full font-medium"
                >
                  {{ product.category }}
                </span>
              </div>

              <h1 class="text-3xl font-bold text-gray-900">{{ product.title }}</h1>

              <div class="text-2xl font-bold text-green-600">
                {{ formatCurrency(product.price) }}
              </div>

              <div class="text-gray-700 leading-relaxed">
                <p>{{ product.description }}</p>
              </div>

              <div class="pt-4">
                <CartAction :product="product" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="text-center py-8">
      <div class="mb-4">
        <svg
          class="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33"
          />
        </svg>
      </div>
      <h3 class="text-lg font-medium text-gray-900 mb-2">Product not found</h3>
      <p class="text-gray-600">The product you're looking for doesn't exist.</p>
      <button
        @click="goBack"
        class="mt-4 bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
      >
        Go Back
      </button>
    </div>
  </div>
</template>

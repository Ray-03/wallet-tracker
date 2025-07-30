<script setup lang="ts">
import { useCartStore } from '@/store/cart'
import IconPlus from '../icons/IconPlus.vue'
import type { Product } from '../types'

const props = defineProps<{ product: Product }>()
const cartStore = useCartStore()

const handleAddToCart = (event: Event) => {
  event.preventDefault()
  event.stopPropagation()
  cartStore.addItem(props.product, 1)
}

const handleInputChange = (event: Event) => {
  event.preventDefault()
  event.stopPropagation()
  const value = parseInt((event.target as HTMLInputElement).value, 10)
  if (!isNaN(value) && value >= 0) {
    cartStore.updateQuantity(props.product.id, value)
  }
}

const handleQuantityChange = (event: Event, action: 'increase' | 'decrease') => {
  event.preventDefault()
  event.stopPropagation()
  if (action === 'increase') {
    cartStore.updateQuantity(props.product.id, cartStore.items[props.product.id].quantity + 1)
  } else {
    cartStore.updateQuantity(props.product.id, cartStore.items[props.product.id].quantity - 1)
  }
}
</script>

<template>
  <div class="p-2 h-10 flex items-center">
    <template v-if="cartStore.items[product.id]">
      <div class="flex items-center space-x-1">
        <button
          @click="(event) => handleQuantityChange(event, 'decrease')"
          class="w-6 h-6 bg-gray-200 hover:bg-gray-300 rounded flex items-center justify-center text-gray-600 transition-colors"
        >
          <span class="text-sm font-bold">−</span>
        </button>
        <input
          type="number"
          min="0"
          step="1"
          :value="cartStore.items[product.id].quantity"
          @input="handleInputChange"
          @click.stop
          class="border rounded px-2 py-1 text-center w-12 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [appearance:textfield]"
        />
        <button
          @click="(event) => handleQuantityChange(event, 'increase')"
          class="w-6 h-6 bg-primary-500 hover:bg-primary-600 rounded flex items-center justify-center text-white transition-colors"
        >
          <span class="text-sm font-bold">+</span>
        </button>
      </div>
    </template>
    <template v-else>
      <button
        class="bg-primary-500 hover:bg-primary-700 text-white rounded-md transition-colors flex items-center justify-center h-10 w-10"
        @click="handleAddToCart"
      >
        <IconPlus />
      </button>
    </template>
  </div>
</template>

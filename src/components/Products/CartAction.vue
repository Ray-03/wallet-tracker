<script setup lang="ts">
import { useCartStore } from '@/store/cart'
import IconPlus from '../icons/IconPlus.vue'
import type { Product } from '../types'

const props = defineProps<{ product: Product }>()
const cartStore = useCartStore()

const handleAddToCart = () => {
  cartStore.addItem(props.product, 1)
}

const handleInputChange = (event: Event) => {
  const value = parseInt((event.target as HTMLInputElement).value, 10)
  if (!isNaN(value) && value >= 0) {
    cartStore.updateQuantity(props.product.id, value)
  }
}
</script>

<template>
  <div class="p-2 h-10 flex items-center">
    <template v-if="cartStore.items[product.id]">
      <input
        type="number"
        min="0"
        step="1"
        :value="cartStore.items[product.id].quantity"
        @input="handleInputChange"
        class="border rounded px-2 py-1 text-center w-10 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [appearance:textfield]"
      />
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

<template>
  <div class="max-w-2xl mx-auto py-8">
    <h1 class="text-2xl font-bold mb-6 text-center">Your Cart</h1>
    <div v-if="cartStore.itemsArray.length === 0" class="text-center text-gray-500 py-12">
      Your cart is empty.
    </div>
    <div v-else>
      <div
        v-for="item in cartStore.itemsArray"
        :key="item.id"
        class="flex items-center border-b py-4"
      >
        <img :src="item.image" :alt="item.title" class="w-16 h-16 object-cover rounded mr-4" />
        <div class="flex-1">
          <div class="font-semibold">{{ item.title }}</div>
          <div class="text-gray-500">${{ item.price.toFixed(2) }}</div>
        </div>
        <input
          type="number"
          min="1"
          class="w-16 border rounded px-2 py-1 mr-2 text-center"
          v-model.number="item.quantity"
          @change="updateQuantity(item)"
        />
        <button @click="removeItem(item.id)" class="text-red-500 hover:underline ml-2">
          Remove
        </button>
      </div>
      <div class="flex justify-between items-center mt-6">
        <div class="text-lg font-semibold">Total: ${{ total.toFixed(2) }}</div>
        <button
          class="bg-primary-500 hover:bg-primary-600 text-white px-6 py-2 rounded-md font-medium"
          :disabled="cartStore.itemsArray.length === 0 || walletStore.loading"
          @click="checkout"
        >
          Checkout
        </button>
      </div>
      <div v-if="successMessage" class="mt-4 text-green-600 text-center">Purchase successful!</div>
      <div v-if="walletStore.error" class="mt-4 text-red-600 text-center">
        {{ walletStore.error }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useCartStore, type LineItem } from '@/store/cart'
import { useWalletStore } from '@/store/wallet'

const cartStore = useCartStore()
cartStore.loadCart()
const walletStore = useWalletStore()
const successMessage = ref(false)

const total = computed(() =>
  cartStore.itemsArray.reduce((sum, item) => sum + item.price * item.quantity, 0),
)

function updateQuantity(item: LineItem) {
  cartStore.updateQuantity(item.id, item.quantity)
}

function removeItem(id: number) {
  cartStore.removeItem(id)
}

async function checkout() {
  try {
    await walletStore.makePurchase([...cartStore.itemsArray], 'Cart checkout')
    cartStore.clearCart()
    successMessage.value = true
    setTimeout(() => (successMessage.value = false), 3000)
  } catch {}
}
</script>

<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
  >
    <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4 max-h-[80vh] overflow-y-auto">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-bold">Confirm Purchase</h2>
        <button @click="$emit('close')" class="text-gray-500 hover:text-gray-700 transition-colors">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </div>

      <div class="mb-4">
        <h3 class="font-semibold mb-2">Items in Cart:</h3>
        <div class="space-y-2 max-h-40 overflow-y-auto">
          <div
            v-for="item in items"
            :key="item.id"
            class="flex items-center justify-between text-sm"
          >
            <div class="flex items-center space-x-2">
              <img :src="item.image" :alt="item.title" class="w-8 h-8 object-cover rounded" />
              <div>
                <div class="font-medium truncate max-w-32">{{ item.title }}</div>
                <div class="text-gray-500">Qty: {{ item.quantity }}</div>
              </div>
            </div>
            <div class="text-right">
              <div class="font-medium">${{ (item.price * item.quantity).toFixed(2) }}</div>
              <div class="text-gray-500 text-xs">${{ item.price.toFixed(2) }} each</div>
            </div>
          </div>
        </div>
      </div>

      <div class="border-t pt-4 mb-4">
        <div class="flex justify-between items-center mb-2">
          <span class="font-medium">Total:</span>
          <span class="text-lg font-bold">${{ total.toFixed(2) }}</span>
        </div>
        <div class="flex justify-between items-center text-sm">
          <span class="text-gray-600">Current Balance:</span>
          <span class="font-medium">${{ currentBalance.toFixed(2) }}</span>
        </div>
        <div class="flex justify-between items-center text-sm">
          <span class="text-gray-600">Balance After Purchase:</span>
          <span
            class="font-medium"
            :class="remainingBalance >= 0 ? 'text-green-600' : 'text-red-600'"
          >
            ${{ remainingBalance.toFixed(2) }}
          </span>
        </div>
      </div>

      <div
        v-if="remainingBalance < 0"
        class="mb-4 p-3 space-y-2 bg-red-50 border border-red-200 rounded-lg"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <svg class="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span class="text-red-700 text-sm">
              Insufficient balance. You need ${{ Math.abs(remainingBalance).toFixed(2) }} more.
            </span>
          </div>
        </div>
        <button
          @click="handleTopUp"
          class="flex w-full items-center px-3 py-1.5 bg-primary-500 text-white text-sm font-medium rounded-md hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors gap-2 justify-center"
        >
          <IconPlus />
          <span>Top Up</span>
        </button>
      </div>

      <div class="flex space-x-3">
        <button
          @click="$emit('close')"
          class="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          @click="confirmPurchase"
          :disabled="remainingBalance < 0 || loading"
          class="flex-1 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          <span v-if="loading">Processing...</span>
          <span v-else>Confirm Purchase</span>
        </button>
      </div>

      <ErrorDisplay
        :error="error"
        :dismissible="true"
        @dismiss="$emit('dismissError')"
        @navigate-to-wallet="$emit('topUp')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { CartItem } from '@/store/cart'
import type { WalletError } from '@/utils/errors'
import IconPlus from '../icons/IconPlus.vue'
import ErrorDisplay from '../ErrorDisplay.vue'

interface Props {
  isOpen: boolean
  items: CartItem[]
  total: number
  currentBalance: number
  loading?: boolean
  error?: WalletError | null
}

interface Emits {
  (e: 'close'): void
  (e: 'confirm'): void
  (e: 'topUp'): void
  (e: 'dismissError'): void
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  error: null,
})

const emit = defineEmits<Emits>()

const remainingBalance = computed(() => props.currentBalance - props.total)

function confirmPurchase() {
  if (remainingBalance.value >= 0) {
    emit('confirm')
  }
}

function handleTopUp() {
  emit('topUp')
}
</script>

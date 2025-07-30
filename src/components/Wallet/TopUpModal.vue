<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
  >
    <div class="bg-white rounded-lg p-6 w-full max-w-md mx-4">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg font-semibold text-gray-900">Top Up Wallet</h3>
        <button @click="closeModal" class="text-gray-400 hover:text-gray-600 transition-colors">
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

      <form @submit.prevent="handleTopUp" class="space-y-4">
        <div>
          <label for="amount" class="block text-sm font-medium text-gray-700 mb-2">
            Amount ($)
          </label>
          <input
            id="amount"
            v-model="amount"
            type="number"
            min="0.01"
            step="0.01"
            placeholder="Enter amount"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            :class="{ 'border-red-500': amountError }"
            required
          />
          <p v-if="amountError" class="text-red-500 text-sm mt-1">{{ amountError }}</p>
        </div>

        <div>
          <label for="description" class="block text-sm font-medium text-gray-700 mb-2">
            Description (Optional)
          </label>
          <input
            id="description"
            v-model="description"
            type="text"
            placeholder="e.g., Monthly top-up"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div class="flex space-x-3 pt-4">
          <button
            type="button"
            @click="closeModal"
            class="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            :disabled="walletStore.loading || !isValidAmount"
            class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <span v-if="walletStore.loading" class="flex items-center justify-center">
              <svg
                class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Processing...
            </span>
            <span v-else>Top Up</span>
          </button>
        </div>
      </form>

      <ErrorDisplay
        :error="walletStore.error"
        :dismissible="true"
        @dismiss="walletStore.setError(null)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useWalletStore } from '@/store/wallet'
import type { Transaction } from '@/store/wallet'
import ErrorDisplay from '@/components/ErrorDisplay.vue'

interface Props {
  isOpen: boolean
}

interface Emits {
  (e: 'close'): void
  (e: 'success', transaction: Transaction): void
}

defineProps<Props>()
const emit = defineEmits<Emits>()

const walletStore = useWalletStore()

const amount = ref('')
const description = ref('')
const amountError = ref('')

const isValidAmount = computed(() => {
  const numAmount = parseFloat(amount.value)
  return numAmount > 0 && !isNaN(numAmount)
})

watch(amount, (newValue) => {
  const numAmount = parseFloat(newValue)
  if (newValue && (numAmount <= 0 || isNaN(numAmount))) {
    amountError.value = 'Please enter a valid amount greater than 0'
  } else {
    amountError.value = ''
  }
})

const closeModal = () => {
  amount.value = ''
  description.value = ''
  amountError.value = ''
  walletStore.setError(null)
  emit('close')
}

const handleTopUp = async () => {
  if (!isValidAmount.value) {
    amountError.value = 'Please enter a valid amount'
    return
  }

  try {
    const transaction = await walletStore.topUp(
      parseFloat(amount.value),
      description.value || 'Wallet top-up',
    )
    emit('success', transaction)
    closeModal()
  } catch {}
}
</script>

<template>
  <div class="max-w-2xl mx-auto py-8">
    <h1 class="text-2xl font-bold mb-6 text-center">Purchase Invoices</h1>
    <div v-if="purchases.length === 0" class="text-center text-gray-500 py-12">
      No purchases found.
    </div>
    <div v-else class="space-y-8">
      <div v-for="tx in purchases" :key="tx.id" class="bg-white rounded-lg shadow border p-6">
        <div class="flex justify-between items-center mb-2">
          <div class="font-semibold text-lg">Invoice #{{ tx.invoiceNumber }}</div>
          <div class="text-sm text-gray-500">{{ formatDate(tx.timestamp) }}</div>
        </div>
        <div class="divide-y divide-gray-200">
          <div v-for="item in tx.items" :key="item.id" class="flex items-center py-4">
            <img :src="item.image" :alt="item.title" class="w-14 h-14 object-cover rounded mr-4" />
            <div class="flex-1">
              <div class="font-medium">{{ item.title }}</div>
              <div class="text-gray-500 text-sm">
                ${{ item.price.toFixed(2) }} x {{ item.quantity }}
              </div>
            </div>
            <div class="font-semibold text-right">
              ${{ (item.price * item.quantity).toFixed(2) }}
            </div>
          </div>
        </div>
        <div class="flex justify-end mt-4">
          <div class="text-lg font-bold">Total: ${{ Math.abs(tx.amount).toFixed(2) }}</div>
        </div>
      </div>
    </div>

    <ErrorDisplay
      :error="walletStore.error"
      :dismissible="true"
      @dismiss="walletStore.setError(null)"
      @navigate-to-wallet="handleNavigateToWallet"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useWalletStore } from '@/store/wallet'
import ErrorDisplay from '@/components/ErrorDisplay.vue'

const router = useRouter()
const walletStore = useWalletStore()
const purchases = computed(() =>
  walletStore.getTransactionHistory.filter(
    (tx) => tx.type === 'purchase' && tx.items && tx.invoiceNumber,
  ),
)

function handleNavigateToWallet() {
  walletStore.setError(null)
  router.push('/wallet?openTopUp=true')
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}
</script>

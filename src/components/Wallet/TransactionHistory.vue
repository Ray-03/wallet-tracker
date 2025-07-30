<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200">
    <div class="p-4 border-b border-gray-200">
      <div class="flex justify-between items-center">
        <h3 class="text-lg font-semibold text-gray-900">Transaction History</h3>
        <div class="flex items-center space-x-2">
          <select
            v-model="filterType"
            class="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Types</option>
            <option value="topup">Top-up</option>
            <option value="purchase">Purchase</option>
            <option value="refund">Refund</option>
          </select>
        </div>
      </div>
    </div>

    <div class="divide-y divide-gray-200">
      <div
        v-for="transaction in filteredTransactions"
        :key="transaction.id"
        class="p-4 hover:bg-gray-50 transition-colors"
      >
        <div class="flex justify-between items-start">
          <div class="flex-1">
            <div class="flex items-center space-x-2">
              <span
                class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
                :class="getTypeBadgeClass(transaction.type)"
              >
                {{ getTypeLabel(transaction.type) }}
              </span>
              <span
                class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
                :class="getStatusBadgeClass(transaction.status)"
              >
                {{ transaction.status }}
              </span>
            </div>
            <p class="text-sm text-gray-900 mt-1">{{ transaction.description }}</p>
            <p class="text-xs text-gray-500 mt-1">
              {{ formatDate(transaction.timestamp) }}
            </p>
          </div>
          <div class="text-right">
            <p
              class="text-sm font-medium"
              :class="transaction.amount >= 0 ? 'text-green-600' : 'text-red-600'"
            >
              {{ transaction.amount >= 0 ? '+' : '' }}${{ Math.abs(transaction.amount).toFixed(2) }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div v-if="filteredTransactions.length === 0" class="p-8 text-center">
      <div class="text-gray-400">
        <svg class="mx-auto h-12 w-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          ></path>
        </svg>
        <p class="text-sm">No transactions found</p>
        <p class="text-xs text-gray-400 mt-1">
          {{
            filterType ? `No ${filterType} transactions` : 'Start by making a top-up or purchase'
          }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useWalletStore } from '@/store/wallet'
import type { Transaction } from '@/types'

const walletStore = useWalletStore()
const filterType = ref('')

const filteredTransactions = computed(() => {
  const transactions = walletStore.getTransactionHistory
  if (!filterType.value) return transactions
  return transactions.filter((t) => t.type === filterType.value)
})

const getTypeLabel = (type: Transaction['type']) => {
  switch (type) {
    case 'topup':
      return 'Top-up'
    case 'purchase':
      return 'Purchase'
    case 'refund':
      return 'Refund'
    default:
      return type
  }
}

const getTypeBadgeClass = (type: Transaction['type']) => {
  switch (type) {
    case 'topup':
      return 'bg-green-100 text-green-800'
    case 'purchase':
      return 'bg-blue-100 text-blue-800'
    case 'refund':
      return 'bg-yellow-100 text-yellow-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const getStatusBadgeClass = (status: Transaction['status']) => {
  switch (status) {
    case 'completed':
      return 'bg-green-100 text-green-800'
    case 'pending':
      return 'bg-yellow-100 text-yellow-800'
    case 'failed':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}
</script>

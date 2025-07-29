<template>
  <div class="bg-gradient-to-tr from-primary-700 to-sky-700 rounded-lg p-4 text-white">
    <div class="flex justify-between items-start">
      <div>
        <h2 class="text-lg font-medium text-blue-100">Active Balance</h2>
        <div class="mt-2 flex items-center space-x-2">
          <BalanceDisplay :balance="walletStore.getBalance" />
        </div>
      </div>
      <button
        @click="$emit('openTopUp')"
        class="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2"
      >
        <IconPlus />
        <span>Top Up</span>
      </button>
    </div>

    <div v-if="walletStore.getTransactionHistory.length > 0" class="mt-4">
      <p class="text-blue-200 text-sm mb-2">Recent Activity</p>
      <div class="space-y-2">
        <div
          v-for="transaction in walletStore.getTransactionHistory.slice(0, 3)"
          :key="transaction.id"
          class="flex justify-between items-center text-sm"
        >
          <span class="text-blue-100 truncate">{{ transaction.description }}</span>
          <span
            :class="transaction.amount >= 0 ? 'text-green-300' : 'text-red-300'"
            class="font-medium"
          >
            {{ transaction.amount >= 0 ? '+' : '' }}${{ Math.abs(transaction.amount).toFixed(2) }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useWalletStore } from '@/store/wallet'
import BalanceDisplay from './BalanceDisplay.vue'
import IconPlus from '../icons/IconPlus.vue'

interface Emits {
  (e: 'openTopUp'): void
}

defineEmits<Emits>()

const walletStore = useWalletStore()
</script>

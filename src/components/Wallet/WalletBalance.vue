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

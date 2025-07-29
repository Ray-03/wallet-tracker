<template>
  <div class="bg-gray-50">
    <div class="max-w-4xl mx-auto p-4 space-y-6">
      <WalletBalance @open-top-up="showTopUpModal = true" />

      <TransactionHistory />

      <div
        v-if="showSuccessMessage"
        class="fixed top-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded z-50"
      >
        <div class="flex items-center">
          <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <span>Top-up successful! Your wallet has been updated.</span>
        </div>
      </div>

      <TopUpModal
        :is-open="showTopUpModal"
        @close="showTopUpModal = false"
        @success="handleTopUpSuccess"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useWalletStore } from '@/store/wallet'
import WalletBalance from '@/components/Wallet/WalletBalance.vue'
import TransactionHistory from '@/components/Wallet/TransactionHistory.vue'
import TopUpModal from '@/components/Wallet/TopUpModal.vue'

const walletStore = useWalletStore()
const showTopUpModal = ref(false)
const showSuccessMessage = ref(false)

const handleTopUpSuccess = () => {
  showSuccessMessage.value = true
  setTimeout(() => {
    showSuccessMessage.value = false
  }, 3000)
}

onMounted(() => {
  walletStore.initializeWallet()
})
</script>

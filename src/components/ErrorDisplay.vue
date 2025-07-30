<template>
  <div v-if="error" class="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
    <div class="flex items-start">
      <div class="flex-shrink-0">
        <svg
          class="h-5 w-5 text-red-400"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
      <div class="ml-3 flex-1">
        <div class="text-sm font-medium">{{ error.code }}</div>
        <div class="mt-1 text-sm">{{ error.message }}</div>
        <div
          v-if="error.data && Object.keys(error.data).length > 0"
          class="mt-2 text-xs opacity-75"
        >
          <div v-for="(value, key) in error.data" :key="key" class="mb-1">
            <span class="font-medium">{{ key }}:</span> {{ value }}
          </div>
        </div>
        <div v-if="showTimestamp" class="mt-2 text-xs opacity-50">
          {{ formatTimestamp(error.timestamp) }}
        </div>
        <button
          v-if="isInsufficientBalanceError"
          @click="$emit('navigateToWallet')"
          class="inline-flex items-center px-3 py-1.5 bg-primary-500 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          <IconPlus />
          <span>Top Up</span>
        </button>
      </div>
      <div v-if="dismissible" class="ml-auto pl-3">
        <button
          @click="$emit('dismiss')"
          class="inline-flex text-red-400 hover:text-red-600 focus:outline-none focus:text-red-600"
        >
          <span class="sr-only">Dismiss</span>
          <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { type WalletError, ErrorCode } from '@/utils/errors'
import IconPlus from './icons/IconPlus.vue'

interface Props {
  error: WalletError | null
  dismissible?: boolean
  showTimestamp?: boolean
}

interface Emits {
  (e: 'dismiss'): void
  (e: 'navigateToWallet'): void
}

const props = defineProps<Props>()
defineEmits<Emits>()

const isInsufficientBalanceError = computed(() => {
  return props.error?.code === ErrorCode.INSUFFICIENT_BALANCE
})

const formatTimestamp = (timestamp: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(timestamp)
}
</script>

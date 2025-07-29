<template>
  <div class="mt-2 flex items-center space-x-2">
    <span v-if="isVisible" class="text-3xl font-bold"> ${{ balance.toFixed(2) }} </span>
    <span v-else class="text-3xl font-bold">••••••</span>
    <button
      @click="toggleBalance"
      class="text-blue-200 hover:text-white transition-colors"
      :title="isVisible ? 'Hide balance' : 'Show balance'"
    >
      <svg v-if="isVisible" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
        ></path>
      </svg>
      <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        ></path>
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
        ></path>
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { defineProps, defineEmits } from 'vue'

defineProps({
  balance: {
    type: Number,
    required: true,
  },
})

const emit = defineEmits(['visibility-changed'])
const isVisible = ref(false)

function toggleBalance() {
  isVisible.value = !isVisible.value
  emit('visibility-changed', isVisible.value)
}
</script>

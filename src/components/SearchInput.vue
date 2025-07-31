<template>
  <div class="relative flex items-center w-full">
    <span class="absolute left-2 text-gray-400">
      <IconMagnifier />
    </span>
    <input
      type="text"
      placeholder="Search product..."
      class="border rounded px-8 py-1 focus:outline-none focus:ring w-full"
      v-model="searchQuery"
      @input="$emit('update:modelValue', searchQuery)"
      @keyup.enter="onEnter"
      @keyup.esc="clearSearch"
    />
    <button
      v-if="searchQuery"
      @click="clearSearch"
      class="absolute right-2 text-gray-400 hover:text-gray-600 focus:outline-none"
      type="button"
    >
      <IconCancel />
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from 'vue'
import IconCancel from './icons/IconCancel.vue'
import IconMagnifier from './icons/IconMagnifier.vue'

const props = defineProps<{ modelValue?: string }>()
const emit = defineEmits(['update:modelValue', 'search'])

const searchQuery = ref(props.modelValue ?? '')

function onEnter() {
  emit('search', searchQuery.value)
}

function clearSearch() {
  searchQuery.value = ''
  emit('update:modelValue', '')
}

watch(
  () => props.modelValue,
  (val) => {
    if (val !== searchQuery.value) searchQuery.value = val ?? ''
  },
)
</script>

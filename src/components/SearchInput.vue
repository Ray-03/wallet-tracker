<template>
  <input
    type="text"
    placeholder="Search product..."
    class="border rounded px-2 py-1 focus:outline-none focus:ring w-full"
    v-model="searchQuery"
    @input="$emit('update:modelValue', searchQuery)"
    @keyup.enter="onEnter"
  />
</template>

<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from 'vue'

const props = defineProps<{ modelValue?: string }>()
const emit = defineEmits(['update:modelValue', 'search'])

const searchQuery = ref(props.modelValue ?? '')

function onEnter() {
  emit('search', searchQuery.value)
  console.log('Search triggered:', searchQuery.value)
}

watch(
  () => props.modelValue,
  (val) => {
    if (val !== searchQuery.value) searchQuery.value = val ?? ''
  },
)
</script>

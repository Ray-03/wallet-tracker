<script setup lang="ts">
defineProps({
  icon: [String, Object],
  alt: String,
  name: String,
})
</script>

<template>
  <span>
    <template v-if="typeof icon === 'string'">
      <img :src="icon" :alt="alt || name" :class="'w-11 h-11' + ' object-cover'" />
    </template>
    <template v-else>
      {{ name }}
    </template>
  </span>
</template>

<script setup lang="ts">
import type { NavIconProps } from './types.ts'

defineProps<NavIconProps>()
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

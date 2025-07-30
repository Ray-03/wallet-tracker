<script setup lang="ts">
import type { NavIconProps } from './types.ts'

defineProps<NavIconProps>()
</script>

<template>
  <span class="relative">
    <template v-if="icon">
      <template v-if="typeof icon === 'string'">
        <img :src="icon" :alt="alt || name" :class="'w-12 h-12' + ' object-cover'" />
      </template>
      <template v-else>
        <component :is="icon" :alt="alt || name" class="w-6 h-6 object-cover" />
      </template>
    </template>
    <template v-else>
      {{ name }}
    </template>

    <span
      v-if="count && count > 0"
      class="absolute -top-3 -right-3 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-medium"
    >
      {{ count > 99 ? '99+' : count }}
    </span>
  </span>
</template>

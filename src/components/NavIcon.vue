<script setup lang="ts">
import type { NavIconProps } from './types.ts'

defineProps<NavIconProps>()
</script>

<template>
  <span>
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
  </span>
</template>

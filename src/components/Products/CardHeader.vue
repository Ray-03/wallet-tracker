<script setup lang="ts">
interface Props {
  image?: string
  alt?: string
  loading?: boolean
}

withDefaults(defineProps<Props>(), {
  loading: false,
})
</script>

<template>
  <div class="aspect-square overflow-hidden outline-primary-500 rounded-lg flex-shrink-0">
    <template v-if="loading">
      <div class="w-full h-full skeleton-shimmer"></div>
    </template>

    <template v-else-if="image && alt">
      <picture>
        <source media="(min-width: 768px)" :srcset="image" />
        <source media="(min-width: 480px)" :srcset="alt" />
        <img
          :src="image"
          :alt="alt"
          class="w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
          decoding="async"
        />
      </picture>
    </template>
  </div>
</template>

<script setup lang="ts">
interface Props {
  image: string
  alt: string
}

defineProps<Props>()
</script>

<template>
  <div class="aspect-square overflow-hidden outline-primary rounded-lg">
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
  </div>
</template>

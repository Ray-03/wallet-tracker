<script setup lang="ts">
import AppNav from './components/AppNav.vue'
</script>

<template>
  <header>
    <AppNav />
  </header>
  <main class="p-4 pb-16 md:pb-0">
    <router-view />
  </main>
</template>

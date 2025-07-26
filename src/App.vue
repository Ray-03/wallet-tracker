<script setup lang="ts">
import AppNav from './components/AppNav.vue'
</script>

<template>
  <header>
    <AppNav />
  </header>
  <main>
    <router-view />
  </main>
</template>

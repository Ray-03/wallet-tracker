<template>
  <nav class="flex justify-between p-4 shadow md:flex md:flex-row flex-row-reverse">
    <div class="flex flex-auto gap-4 flex-row-reverse items-center">
      <a :href="cartLink.href" class="flex items-center justify-center">
        <component :is="cartLink.icon" class="w-8 h-8 text-primary" />
        <span class="sr-only">{{ cartLink.name }}</span>
      </a>
      <SearchInput class="w-full" />
      <template v-for="link in navLinks" :key="link.name">
        <a :href="link.href" class="hidden md:inline items-center justify-center">
          <NavIcon :icon="link.icon" :alt="link.alt" :name="link.name" />
        </a>
      </template>
    </div>
  </nav>
  <!-- Bottom Navbar (Mobile Only) -->
  <nav
    class="fixed bottom-0 left-0 right-0 shadow-inner flex flex-row-reverse justify-around p-2 md:hidden"
  >
    <template v-for="link in navLinks" :key="link.name + '-mobile'">
      <a :href="link.href" class="min-w-[44px] min-h-[44px] flex items-center justify-center">
        <NavIcon :icon="link.icon" :alt="link.alt" :name="link.name" :img-size="'w-11'" />
      </a>
    </template>
  </nav>
</template>

<script setup lang="ts">
import NavIcon from './NavIcon.vue'
import SearchInput from './SearchInput.vue'
import IconShoppingBag from './icons/IconShoppingBag.vue'
import type { INavLink } from './types'

const navLinks: INavLink[] = [
  { name: 'History', href: 'history' },
  { name: 'Wallet', href: 'wallet' },
  { name: 'Home', href: '/', icon: '/icon.jpg', alt: 'Home' },
]

const cartLink: INavLink = { name: 'Cart', href: '#', icon: IconShoppingBag, alt: 'Cart' }
</script>

<template>
  <nav class="hidden md:flex justify-between items-center p-4 shadow flex-row">
    <a
      :href="homeLink.href"
      class="flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary-500"
      aria-label="Go to Home"
    >
      <NavIcon :icon="homeLink.icon" :alt="homeLink.alt" :name="homeLink.name" />
    </a>
    <div class="flex-1 mx-4">
      <SearchInput class="w-full" />
    </div>
    <div class="flex gap-4 items-center">
      <template v-for="link in desktopLinks" :key="link.name">
        <a :href="link.href" class="items-center justify-center">
          <NavIcon :icon="link.icon" :alt="link.alt" :name="link.name" />
        </a>
      </template>
    </div>
  </nav>

  <nav class="md:hidden">
    <div class="flex justify-between items-center p-4 shadow flex-row-reverse">
      <a
        v-for="link in mobileTopLinks"
        :key="link.name + '-mobile-top'"
        :href="link.href"
        class="min-w-[44px] min-h-[44px] flex items-center justify-center"
      >
        <NavIcon :icon="link.icon" :alt="link.alt" :name="link.name" :img-size="'w-11'" />
      </a>
      <div class="flex-1 mx-2">
        <SearchInput class="w-full" />
      </div>
    </div>

    <div class="fixed bottom-0 left-0 right-0 shadow-inner flex justify-around p-2 bg-white">
      <template v-for="link in mobileBottomLinks" :key="link.name + '-mobile-bottom'">
        <a :href="link.href" class="min-w-[44px] min-h-[44px] flex items-center justify-center">
          <NavIcon :icon="link.icon" :alt="link.alt" :name="link.name" :img-size="'w-11'" />
        </a>
      </template>
    </div>
  </nav>
</template>

<script setup lang="ts">
import NavIcon from './NavIcon.vue'
import SearchInput from './SearchInput.vue'
import IconShoppingBag from './icons/IconShoppingBag.vue'
import IconMagnifier from './icons/IconMagnifier.vue'
import { NavSection } from './types'
import type { INavLink } from './types'

const baseLinks: Record<NavSection, Partial<INavLink> & { name: NavSection }> = {
  [NavSection.Home]: { name: NavSection.Home, href: '/', icon: '/icon.jpg', alt: 'Home' },
  [NavSection.Wallet]: { name: NavSection.Wallet, href: 'wallet' },
  [NavSection.History]: { name: NavSection.History, href: 'history' },
  [NavSection.Cart]: { name: NavSection.Cart, href: 'cart', icon: IconShoppingBag, alt: 'Cart' },
  [NavSection.Search]: { name: NavSection.Search, href: '#', icon: IconMagnifier, alt: 'Search' },
}

const desktopOrder = [NavSection.Wallet, NavSection.History, NavSection.Cart]
const mobileTopOrder = [NavSection.Cart]
const mobileBottomOrder = [NavSection.Wallet, NavSection.Home, NavSection.History]

const desktopLinks = desktopOrder.map((name) => baseLinks[name])
const mobileTopLinks = mobileTopOrder.map((name) => baseLinks[name])
const mobileBottomLinks = mobileBottomOrder.map((name) => baseLinks[name])
const homeLink = baseLinks[NavSection.Home]
</script>

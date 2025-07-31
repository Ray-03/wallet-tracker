import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import HistoryPage from '@/pages/HistoryPage.vue'
import WalletPage from '@/pages/WalletPage.vue'
import CartPage from '@/pages/CartPage.vue'
import ProductDetailPage from '@/pages/ProductDetailPage.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/history', component: HistoryPage },
  { path: '/wallet', component: WalletPage },
  { path: '/cart', component: CartPage },
  { path: '/product/:id', component: ProductDetailPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

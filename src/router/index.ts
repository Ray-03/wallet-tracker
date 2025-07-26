import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import HistoryPage from '@/pages/HistoryPage.vue'
import WalletPage from '@/pages/WalletPage.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/history', component: HistoryPage },
  { path: '/wallet', component: WalletPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

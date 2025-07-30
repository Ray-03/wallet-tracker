import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router/index.ts'
import { useWalletStore } from './store/wallet'
import { useCartStore } from './store/cart'

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.use(router)

const walletStore = useWalletStore()
walletStore.initializeWallet()

const cartStore = useCartStore()
cartStore.loadCart()

app.mount('#app')

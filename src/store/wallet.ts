import { defineStore } from 'pinia'

export interface Transaction {
  id: string
  type: 'topup' | 'purchase' | 'refund'
  amount: number
  description: string
  timestamp: Date
  status: 'completed' | 'pending' | 'failed'
}

export interface WalletState {
  balance: number
  transactionId: number
  transactions: Transaction[]
  loading: boolean
  error: string | null
}

export const useWalletStore = defineStore('wallet', {
  state: (): WalletState => ({
    balance: 0,
    transactionId: 0,
    transactions: [],
    loading: false,
    error: null,
  }),

  getters: {
    getBalance: (state) => state.balance,
    getTransaction: (state) => (id: string) => state.transactions.find((t) => t.id === id),
    getTransactionHistory: (state) =>
      state.transactions.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()),
  },
})

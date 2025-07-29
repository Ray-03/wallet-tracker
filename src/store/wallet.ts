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
  transactions: Transaction[]
  loading: boolean
  error: string | null
}

export const useWalletStore = defineStore('wallet', {
  state: (): WalletState => ({
    balance: 0,
    transactions: [],
    loading: false,
    error: null,
  }),
})

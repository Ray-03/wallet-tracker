import { defineStore } from 'pinia'
import type { LineItem } from './cart'

export interface Transaction {
  id: string
  type: 'topup' | 'purchase' | 'refund'
  amount: number
  description: string
  timestamp: Date
  status: 'completed' | 'pending' | 'failed'

  items?: LineItem[]
  invoiceNumber?: string
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

  getters: {
    getBalance: (state) => state.balance,
    getTransaction: (state) => (id: string) => state.transactions.find((t) => t.id === id),
    getTransactionHistory: (state) =>
      state.transactions.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()),
  },

  actions: {
    setLoading(loading: boolean) {
      this.loading = loading
    },

    setError(error: string | null) {
      this.error = error
    },

    async topUp(amount: number, description: string = 'Wallet top-up') {
      this.setLoading(true)
      this.setError(null)

      try {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        if (amount <= 0) {
          throw new Error('Top-up amount must be greater than 0')
        }

        const transaction: Transaction = {
          id: `tx_${Math.floor(Date.now() / 1000)}_${Math.random().toString(36).substring(2, 9)}`,
          type: 'topup',
          amount,
          description,
          timestamp: new Date(),
          status: 'completed',
        }

        this.balance += amount
        this.transactions.push(transaction)

        this.saveToLocalStorage()

        return transaction
      } catch (error) {
        this.setError(error instanceof Error ? error.message : 'Top-up failed')
        throw error
      } finally {
        this.setLoading(false)
      }
    },

    async makePurchase(items: LineItem[], description: string) {
      this.setLoading(true)
      this.setError(null)

      try {
        if (!items.length) {
          throw new Error('No items to purchase')
        }

        const amount = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
        if (amount <= 0) {
          throw new Error('Purchase amount must be greater than 0')
        }

        if (this.balance < amount) {
          throw new Error('Insufficient balance')
        }

        const invoiceNumber = `INV-${Date.now()}-${Math.floor(Math.random() * 10000)}`

        const transaction: Transaction = {
          id: `tx_${Math.floor(Date.now() / 1000)}_${Math.random().toString(36).substring(2, 9)}`,
          type: 'purchase',
          amount: -amount,
          description,
          timestamp: new Date(),
          status: 'completed',
          items,
          invoiceNumber,
        }

        this.balance -= amount
        this.transactions.push(transaction)

        this.saveToLocalStorage()

        return transaction
      } catch (error) {
        this.setError(error instanceof Error ? error.message : 'Purchase failed')
        throw error
      } finally {
        this.setLoading(false)
      }
    },

    async refundPurchase(transactionId: string, amount: number, description: string = 'Refund') {
      this.setLoading(true)
      this.setError(null)

      try {
        const originalTransaction = this.transactions.find((t) => t.id === transactionId)
        if (!originalTransaction) {
          throw new Error('Transaction not found')
        }

        const refundTransaction: Transaction = {
          id: `tx_${Math.floor(Date.now() / 1000)}_${Math.random().toString(36).substring(2, 9)}`,
          type: 'refund',
          amount,
          description,
          timestamp: new Date(),
          status: 'completed',
        }

        this.balance += amount
        this.transactions.push(refundTransaction)

        this.saveToLocalStorage()

        return refundTransaction
      } catch (error) {
        this.setError(error instanceof Error ? error.message : 'Refund failed')
        throw error
      } finally {
        this.setLoading(false)
      }
    },

    saveToLocalStorage() {
      try {
        localStorage.setItem('wallet_balance', this.balance.toString())
        localStorage.setItem('wallet_transactions', JSON.stringify(this.transactions))
      } catch (error) {
        console.error('Error saving wallet data:', error)
      }
    },

    initializeWallet() {
      try {
        const savedBalance = localStorage.getItem('wallet_balance')
        const savedTransactions = localStorage.getItem('wallet_transactions')

        if (savedBalance) {
          this.balance = parseFloat(savedBalance)
        }

        if (savedTransactions) {
          const parsedTransactions = JSON.parse(savedTransactions)
          this.transactions = parsedTransactions.map(
            (t: Omit<Transaction, 'timestamp'> & { timestamp: string }) => ({
              ...t,
              timestamp: new Date(t.timestamp),
            }),
          )
        }
      } catch (error) {
        console.error('Error loading wallet data:', error)
      }
    },
  },
})

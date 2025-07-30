import { defineStore } from 'pinia'
import type { CartItem } from './cart'
import { WalletError, createWalletError, handleError } from '@/utils/errors'

export interface Transaction {
  id: string
  type: 'topup' | 'purchase' | 'refund'
  amount: number
  description: string
  timestamp: Date
  status: 'completed' | 'pending' | 'failed'

  items?: CartItem[]
  invoiceNumber?: string
}

export interface WalletState {
  balance: number
  transactions: Transaction[]
  loading: boolean
  error: WalletError | null
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

    setError(error: WalletError | null) {
      this.error = error
    },

    async topUp(amount: number, description: string = 'Wallet top-up') {
      this.setLoading(true)
      this.setError(null)

      try {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        if (amount <= 0) {
          throw createWalletError.invalidTopUpAmount(amount)
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
        const walletError = handleError(error)
        this.setError(walletError)
        throw walletError
      } finally {
        this.setLoading(false)
      }
    },

    async makePurchase(items: CartItem[], description: string) {
      this.setLoading(true)
      this.setError(null)

      try {
        if (!items.length) {
          throw createWalletError.noItemsToPurchase()
        }

        const amount = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
        if (amount <= 0) {
          throw createWalletError.invalidPurchaseAmount(amount)
        }

        if (this.balance < amount) {
          throw createWalletError.insufficientBalance(amount, this.balance)
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
        const walletError = handleError(error)
        this.setError(walletError)
        throw walletError
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
          throw createWalletError.transactionNotFound(transactionId)
        }

        if (amount <= 0) {
          throw createWalletError.invalidRefundAmount(amount)
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
        const walletError = handleError(error)
        this.setError(walletError)
        throw walletError
      } finally {
        this.setLoading(false)
      }
    },

    saveToLocalStorage() {
      try {
        localStorage.setItem('wallet_balance', this.balance.toString())
        localStorage.setItem('wallet_transactions', JSON.stringify(this.transactions))
      } catch (error) {
        const storageError = createWalletError.storageError(
          'save',
          error instanceof Error ? error : undefined,
        )
        console.error('Error saving wallet data:', storageError)
        throw storageError
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
        const storageError = createWalletError.storageError(
          'load',
          error instanceof Error ? error : undefined,
        )
        console.error('Error loading wallet data:', storageError)
      }
    },
  },
})

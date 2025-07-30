import { defineStore } from 'pinia'
import type { CartItem, Transaction, WalletState } from '@/types'
import { WalletError, createWalletError, handleError } from '@/utils/errors'
import { walletStorage } from '@/utils/storage'
import { generateTransactionId, calculateTotal } from '@/utils/ui'
import { TRANSACTION_TYPES, TRANSACTION_STATUS } from '@/constants'

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
          id: generateTransactionId(),
          type: TRANSACTION_TYPES.TOPUP,
          amount,
          description,
          timestamp: new Date(),
          status: TRANSACTION_STATUS.COMPLETED,
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

        const amount = calculateTotal(items)
        if (amount <= 0) {
          throw createWalletError.invalidPurchaseAmount(amount)
        }

        if (this.balance < amount) {
          throw createWalletError.insufficientBalance(amount, this.balance)
        }

        const invoiceNumber = `INV-${Date.now()}-${Math.floor(Math.random() * 10000)}`

        const transaction: Transaction = {
          id: generateTransactionId(),
          type: TRANSACTION_TYPES.PURCHASE,
          amount: -amount,
          description,
          timestamp: new Date(),
          status: TRANSACTION_STATUS.COMPLETED,
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
          id: generateTransactionId(),
          type: TRANSACTION_TYPES.REFUND,
          amount,
          description,
          timestamp: new Date(),
          status: TRANSACTION_STATUS.COMPLETED,
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
        walletStorage.save({
          balance: this.balance,
          transactions: this.transactions,
        })
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
        const savedData = walletStorage.load<{
          balance: number
          transactions: Array<Omit<Transaction, 'timestamp'> & { timestamp: string }>
        }>()

        if (savedData) {
          this.balance = savedData.balance
          this.transactions = savedData.transactions.map((t) => ({
            ...t,
            timestamp: new Date(t.timestamp),
          }))
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

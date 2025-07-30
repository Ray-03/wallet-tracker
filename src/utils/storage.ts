import { STORAGE_KEYS } from '@/constants'
import { StorageError } from '@/utils/errors'

export class StorageManager {
  static save<T>(key: string, data: T): void {
    try {
      const serializedData = JSON.stringify(data)
      localStorage.setItem(key, serializedData)
    } catch (error) {
      throw new StorageError('save', error instanceof Error ? error : undefined)
    }
  }

  static load<T = unknown>(key: string): T | null {
    try {
      const serializedData = localStorage.getItem(key)
      if (serializedData === null) {
        return null
      }
      return JSON.parse(serializedData) as T
    } catch (error) {
      throw new StorageError('load', error instanceof Error ? error : undefined)
    }
  }

  static remove(key: string): void {
    try {
      localStorage.removeItem(key)
    } catch (error) {
      throw new StorageError('save', error instanceof Error ? error : undefined)
    }
  }

  static clear(): void {
    try {
      localStorage.clear()
    } catch (error) {
      throw new StorageError('save', error instanceof Error ? error : undefined)
    }
  }
}

// Specific storage functions for cart
export const cartStorage = {
  save: (data: unknown) => StorageManager.save(STORAGE_KEYS.CART_ITEMS, data),
  load: <T = unknown>() => StorageManager.load<T>(STORAGE_KEYS.CART_ITEMS),
  remove: () => StorageManager.remove(STORAGE_KEYS.CART_ITEMS),
}

// Specific storage functions for wallet
export const walletStorage = {
  save: (data: unknown) => StorageManager.save(STORAGE_KEYS.WALLET_DATA, data),
  load: <T = unknown>() => StorageManager.load<T>(STORAGE_KEYS.WALLET_DATA),
  remove: () => StorageManager.remove(STORAGE_KEYS.WALLET_DATA),
}

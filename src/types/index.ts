import type { WalletError } from '@/utils/errors'

// Core domain types
export interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
}

export interface CartItem extends Product {
  quantity: number
}

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

// Navigation types
export interface NavIconProps {
  icon?: string | object
  alt?: string
  name?: string
  count?: number
}

export interface NavLink extends NavIconProps {
  href: string
}

export enum NavSection {
  Home = 'Home',
  Wallet = 'Wallet',
  History = 'History',
  Cart = 'Cart',
  Search = 'Search',
}

// Store state types
export interface ProductsState {
  products: Product[]
  filteredProducts: Product[]
  product: Product | null
  loading: boolean
  error: WalletError | null
  searchQuery: string
}

export interface CartState {
  items: { [id: number]: CartItem }
}

export interface WalletState {
  balance: number
  transactions: Transaction[]
  loading: boolean
  error: WalletError | null
}

// Component prop types
export interface ErrorDisplayProps {
  error: WalletError | null
  dismissible?: boolean
}

export interface CheckoutModalProps {
  isOpen: boolean
  items: CartItem[]
  total: number
  currentBalance: number
  loading?: boolean
  error?: WalletError | null
}

export interface ProductCardProps {
  product: Product
  loading?: boolean
}

export interface CartActionProps {
  product: Product
}

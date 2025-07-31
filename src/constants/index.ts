// API Configuration
export const API_CONFIG = {
  BASE_URL: 'https://fakestoreapi.com',
  PRODUCTS_ENDPOINT: '/products',
  TIMEOUT: 10000,
} as const

// Local Storage Keys
export const STORAGE_KEYS = {
  CART_ITEMS: 'cart_items',
  WALLET_DATA: 'wallet_data',
} as const

// UI Constants
export const UI_CONSTANTS = {
  SUCCESS_MESSAGE_DURATION: 3000,
  TOP_UP_MODAL_PARAM: 'openTopUp',
  SKELETON_ANIMATION_DURATION: 1500,
} as const

// Transaction Types
export const TRANSACTION_TYPES = {
  TOPUP: 'topup',
  PURCHASE: 'purchase',
  REFUND: 'refund',
} as const

// Transaction Status
export const TRANSACTION_STATUS = {
  COMPLETED: 'completed',
  PENDING: 'pending',
  FAILED: 'failed',
} as const

// Navigation Routes
export const ROUTES = {
  HOME: '/',
  CART: '/cart',
  WALLET: '/wallet',
  HISTORY: '/history',
  PRODUCT_DETAIL: '/product/:id',
} as const

// Grid Breakpoints
export const GRID_BREAKPOINTS = {
  MOBILE: 1,
  TABLET: 2,
  DESKTOP: 3,
  LARGE_DESKTOP: 4,
} as const

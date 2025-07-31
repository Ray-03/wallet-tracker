import { UI_CONSTANTS } from '@/constants'

// Currency formatting
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

// Date formatting
export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

// Relative time formatting
export const formatRelativeTime = (date: Date): string => {
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (diffInSeconds < 60) {
    return 'Just now'
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60)
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`
  }

  const diffInHours = Math.floor(diffInMinutes / 60)
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`
  }

  const diffInDays = Math.floor(diffInHours / 24)
  if (diffInDays < 7) {
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`
  }

  return formatDate(date)
}

// Text truncation
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) {
    return text
  }
  return text.slice(0, maxLength) + '...'
}

// Debounce function
export const debounce = <T extends (...args: unknown[]) => unknown>(
  func: T,
  delay: number,
): ((...args: Parameters<T>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout>
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func(...args), delay)
  }
}

// Generate unique ID
export const generateId = (): string => {
  return `id_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
}

// Generate transaction ID
export const generateTransactionId = (): string => {
  return `tx_${Math.floor(Date.now() / 1000)}_${Math.random().toString(36).substring(2, 9)}`
}

// Show success message with auto-hide
export const showSuccessMessage = (
  message: string,
  duration: number = UI_CONSTANTS.SUCCESS_MESSAGE_DURATION,
): void => {
  // This could be integrated with a toast notification system
  console.log(`Success: ${message}`)
  setTimeout(() => {
    console.log('Message hidden')
  }, duration)
}

// Validate numeric input
export const validateNumericInput = (value: string): boolean => {
  const numValue = parseFloat(value)
  return !isNaN(numValue) && numValue >= 0
}

// Calculate total from cart items
export const calculateTotal = (items: Array<{ price: number; quantity: number }>): number => {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0)
}

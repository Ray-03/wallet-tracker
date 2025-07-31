# Custom Error Handling System

This directory contains a comprehensive custom error handling system for the wallet application.

## Overview

The error handling system provides:

- **Error Codes**: Enum-based error codes for consistent error identification
- **Custom Error Classes**: Specific error types with structured data
- **Error Factory Functions**: Convenient functions to create errors
- **Error Handler**: Utility to wrap and standardize all errors
- **Reusable Components**: UI components for consistent error display

## Error Codes

```typescript
enum ErrorCode {
  // Wallet errors
  INSUFFICIENT_BALANCE = 'Insufficient Wallet Balance',
  INVALID_TOPUP_AMOUNT = 'Invalid Top-up Amount',
  INVALID_PURCHASE_AMOUNT = 'Invalid Purchase Amount',
  TRANSACTION_NOT_FOUND = 'Transaction Not Found',
  NO_ITEMS_TO_PURCHASE = 'No Items to Purchase',
  INVALID_REFUND_AMOUNT = 'Invalid Refund Amount',

  // Storage errors
  STORAGE_SAVE_FAILED = 'Storage Save Failed',
  STORAGE_LOAD_FAILED = 'Storage Load Failed',

  // API errors
  API_REQUEST_FAILED = 'API Request Failed',
  API_TIMEOUT = 'API Timeout',
  API_NETWORK_ERROR = 'API Network Error',

  // Validation errors
  VALIDATION_FAILED = 'Validation Failed',
  INVALID_INPUT = 'Invalid Input',

  // General errors
  UNKNOWN_ERROR = 'Unknown Error',
  OPERATION_FAILED = 'Operation Failed',
}
```

## Error Classes

### Base Error Class

```typescript
class WalletError extends Error {
  public readonly code: ErrorCode
  public readonly data: ErrorData
  public readonly timestamp: Date
}
```

### Specific Error Classes

- `InsufficientBalanceError`: For insufficient wallet balance
- `InvalidTopUpAmountError`: For invalid top-up amounts
- `InvalidPurchaseAmountError`: For invalid purchase amounts
- `TransactionNotFoundError`: For missing transactions
- `NoItemsToPurchaseError`: For empty cart purchases
- `InvalidRefundAmountError`: For invalid refund amounts
- `StorageError`: For localStorage failures
- `APIError`: For API request failures
- `ValidationError`: For validation failures

## Usage Examples

### Creating Errors

```typescript
// Using factory functions (recommended)
const error = createWalletError.insufficientBalance(100, 50)

// Using specific error classes
const error = new InsufficientBalanceError(100, 50)

// Using base class
const error = new WalletError(ErrorCode.INSUFFICIENT_BALANCE, 'Insufficient balance', {
  required: 100,
  available: 50,
})
```

### Error Handling

```typescript
try {
  // Some operation that might fail
  await walletStore.makePurchase(items, 'Purchase')
} catch (error) {
  // Standardize the error
  const walletError = handleError(error)

  // Set error in store
  walletStore.setError(walletError)

  // Log error details
  console.error('Error details:', walletError.toJSON())
}
```

### Error Display

```vue
<template>
  <ErrorDisplay
    :error="walletStore.error"
    :dismissible="true"
    @dismiss="walletStore.setError(null)"
  />
</template>

<script setup>
import ErrorDisplay from '@/components/ErrorDisplay.vue'
</script>
```

## Error Data Structure

Each error contains:

- **code**: ErrorCode enum value
- **message**: Human-readable error message
- **data**: Additional context data (amounts, IDs, etc.)
- **timestamp**: When the error occurred

## Best Practices

1. **Use factory functions** for creating errors when possible
2. **Always handle errors** with the `handleError` utility
3. **Include relevant data** in error objects for debugging
4. **Use the ErrorDisplay component** for consistent UI
5. **Log errors** with `toJSON()` for structured logging

## Integration with Stores

The error system is integrated with Pinia stores:

```typescript
// Store state includes WalletError type
interface WalletState {
  error: WalletError | null
}

// Store actions use custom errors
async topUp(amount: number) {
  try {
    if (amount <= 0) {
      throw createWalletError.invalidTopUpAmount(amount)
    }
    // ... rest of logic
  } catch (error) {
    const walletError = handleError(error)
    this.setError(walletError)
    throw walletError
  }
}
```

export enum ErrorCode {
  INSUFFICIENT_BALANCE = 'Insufficient Wallet Balance',
  INVALID_TOPUP_AMOUNT = 'Invalid Top-up Amount',
  INVALID_PURCHASE_AMOUNT = 'Invalid Purchase Amount',
  TRANSACTION_NOT_FOUND = 'Transaction Not Found',
  NO_ITEMS_TO_PURCHASE = 'No Items to Purchase',
  INVALID_REFUND_AMOUNT = 'Invalid Refund Amount',

  STORAGE_SAVE_FAILED = 'Storage Save Failed',
  STORAGE_LOAD_FAILED = 'Storage Load Failed',

  API_REQUEST_FAILED = 'API Request Failed',
  API_TIMEOUT = 'API Timeout',
  API_NETWORK_ERROR = 'API Network Error',

  VALIDATION_FAILED = 'Validation Failed',
  INVALID_INPUT = 'Invalid Input',

  UNKNOWN_ERROR = 'Unknown Error',
  OPERATION_FAILED = 'Operation Failed',
}

export interface ErrorData {
  [key: string]: unknown
}

export class WalletError extends Error {
  public readonly code: ErrorCode
  public readonly data: ErrorData
  public readonly timestamp: Date

  constructor(code: ErrorCode, message: string, data: ErrorData = {}) {
    super(message)
    this.name = 'WalletError'
    this.code = code
    this.data = data
    this.timestamp = new Date()
  }

  toJSON() {
    return {
      name: this.name,
      code: this.code,
      message: this.message,
      data: this.data,
      timestamp: this.timestamp.toISOString(),
      stack: this.stack,
    }
  }
}

export class InsufficientBalanceError extends WalletError {
  constructor(requiredAmount: number, currentBalance: number) {
    super(
      ErrorCode.INSUFFICIENT_BALANCE,
      `Insufficient balance. Required: $${requiredAmount.toFixed(2)}, Available: $${currentBalance.toFixed(2)}`,
      {
        requiredAmount,
        currentBalance,
        shortfall: requiredAmount - currentBalance,
      },
    )
  }
}

export class InvalidTopUpAmountError extends WalletError {
  constructor(amount: number) {
    super(
      ErrorCode.INVALID_TOPUP_AMOUNT,
      `Top-up amount must be greater than 0. Provided: $${amount.toFixed(2)}`,
      { amount },
    )
  }
}

export class InvalidPurchaseAmountError extends WalletError {
  constructor(amount: number) {
    super(
      ErrorCode.INVALID_PURCHASE_AMOUNT,
      `Purchase amount must be greater than 0. Provided: $${amount.toFixed(2)}`,
      { amount },
    )
  }
}

export class TransactionNotFoundError extends WalletError {
  constructor(transactionId: string) {
    super(ErrorCode.TRANSACTION_NOT_FOUND, `Transaction not found with ID: ${transactionId}`, {
      transactionId,
    })
  }
}

export class NoItemsToPurchaseError extends WalletError {
  constructor() {
    super(ErrorCode.NO_ITEMS_TO_PURCHASE, 'No items to purchase. Cart is empty.', {})
  }
}

export class InvalidRefundAmountError extends WalletError {
  constructor(amount: number) {
    super(
      ErrorCode.INVALID_REFUND_AMOUNT,
      `Refund amount must be greater than 0. Provided: $${amount.toFixed(2)}`,
      { amount },
    )
  }
}

export class StorageError extends WalletError {
  constructor(operation: 'save' | 'load', originalError?: Error) {
    const code =
      operation === 'save' ? ErrorCode.STORAGE_SAVE_FAILED : ErrorCode.STORAGE_LOAD_FAILED
    super(code, `Failed to ${operation} wallet data to localStorage`, {
      operation,
      originalError: originalError?.message,
    })
  }
}

export class APIError extends WalletError {
  constructor(code: ErrorCode, message: string, statusCode?: number, endpoint?: string) {
    super(code, message, {
      statusCode,
      endpoint,
      timestamp: new Date().toISOString(),
    })
  }
}

export class ValidationError extends WalletError {
  constructor(field: string, value: unknown, rule: string) {
    super(ErrorCode.VALIDATION_FAILED, `Validation failed for field "${field}": ${rule}`, {
      field,
      value,
      rule,
    })
  }
}

export const createWalletError = {
  insufficientBalance: (requiredAmount: number, currentBalance: number) =>
    new InsufficientBalanceError(requiredAmount, currentBalance),

  invalidTopUpAmount: (amount: number) => new InvalidTopUpAmountError(amount),

  invalidPurchaseAmount: (amount: number) => new InvalidPurchaseAmountError(amount),

  transactionNotFound: (transactionId: string) => new TransactionNotFoundError(transactionId),

  noItemsToPurchase: () => new NoItemsToPurchaseError(),

  invalidRefundAmount: (amount: number) => new InvalidRefundAmountError(amount),

  storageError: (operation: 'save' | 'load', originalError?: Error) =>
    new StorageError(operation, originalError),

  apiError: (code: ErrorCode, message: string, statusCode?: number, endpoint?: string) =>
    new APIError(code, message, statusCode, endpoint),

  validationError: (field: string, value: unknown, rule: string) =>
    new ValidationError(field, value, rule),
}

export const handleError = (error: unknown): WalletError => {
  if (error instanceof WalletError) {
    return error
  }

  if (error instanceof Error) {
    return new WalletError(ErrorCode.UNKNOWN_ERROR, error.message, { originalError: error.name })
  }

  return new WalletError(ErrorCode.UNKNOWN_ERROR, 'An unknown error occurred', {
    originalError: String(error),
  })
}

import axios from 'axios'
import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import { createWalletError, handleError, ErrorCode, type WalletError } from '@/utils/errors'

export async function apiRequest<T>(
  config: AxiosRequestConfig,
  store: { setLoading: (v: boolean) => void; setError: (e: WalletError | null) => void },
): Promise<AxiosResponse<T> | null> {
  store.setLoading(true)
  store.setError(null)
  try {
    const res = await axios.request<T>(config)
    return res
  } catch (err: unknown) {
    let apiError: WalletError

    if (axios.isAxiosError(err)) {
      if (err.code === 'ECONNABORTED') {
        apiError = createWalletError.apiError(
          ErrorCode.API_TIMEOUT,
          'Request timeout',
          err.response?.status,
          config.url,
        )
      } else if (err.code === 'ERR_NETWORK') {
        apiError = createWalletError.apiError(
          ErrorCode.API_NETWORK_ERROR,
          'Network error - please check your connection',
          err.response?.status,
          config.url,
        )
      } else {
        apiError = createWalletError.apiError(
          ErrorCode.API_REQUEST_FAILED,
          err.response?.data?.message || err.message || 'API request failed',
          err.response?.status,
          config.url,
        )
      }
    } else {
      apiError = handleError(err)
    }

    store.setError(apiError)
    return null
  } finally {
    store.setLoading(false)
  }
}

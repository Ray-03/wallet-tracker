import axios from 'axios'
import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export async function apiRequest<T>(
  config: AxiosRequestConfig,
  store: { setLoading: (v: boolean) => void; setError: (e: string | null) => void },
): Promise<AxiosResponse<T> | null> {
  store.setLoading(true)
  store.setError(null)
  try {
    const res = await axios.request<T>(config)
    return res
  } catch (err: unknown) {
    store.setError(err instanceof Error ? err.message : 'API request failed.')
    return null
  } finally {
    store.setLoading(false)
  }
}

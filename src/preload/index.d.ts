import type { KeptApi } from '../shared/types'

declare global {
  interface Window {
    kept: KeptApi
  }
}

import { ElectronAPI } from '@electron-toolkit/preload'
import type { KeptApi } from '../shared/types'

declare global {
  interface Window {
    electron: ElectronAPI
    kept: KeptApi
  }
}

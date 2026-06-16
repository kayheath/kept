import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { CHANNELS } from '../shared/ipc-contract'
import type { KeptApi } from '../shared/types'

// The typed bridge. The preload only forwards ipcRenderer.invoke calls — it does
// NOT validate, import the repo, or touch the DB (validation is main-side, AR6).
// Importing src/shared is safe under sandbox: true because it compiles to pure
// JS strings/types (channel constants) — no Node built-ins, no Zod runtime.
const kept: KeptApi = {
  tasks: {
    create: (input) => ipcRenderer.invoke(CHANNELS.tasksCreate, input),
    today: () => ipcRenderer.invoke(CHANNELS.tasksToday)
  }
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('kept', kept)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.kept = kept
}

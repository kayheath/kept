import { contextBridge, ipcRenderer } from 'electron'
import { CHANNELS } from '../shared/ipc-contract'
import type { KeptApi } from '../shared/types'

// The typed bridge. The preload only forwards ipcRenderer.invoke calls — it does
// NOT validate, import the repo, or touch the DB (validation is main-side, AR6).
//
// Self-contained by necessity: with `sandbox: true` (AR7 hardening) a preload may
// only `require('electron')` and Node built-ins — NOT third-party packages. So
// this file depends on `electron` alone. Importing `../shared/ipc-contract` is
// safe because it compiles to plain JS constants (channel names) that the bundler
// inlines — no Node built-ins, no Zod runtime, no node_modules require survives.
const kept: KeptApi = {
  tasks: {
    create: (input) => ipcRenderer.invoke(CHANNELS.tasksCreate, input),
    today: () => ipcRenderer.invoke(CHANNELS.tasksToday)
  }
}

// Expose the bridge. With context isolation on (AR7) this crosses via the
// contextBridge; the else branch is a defensive fallback for a non-isolated
// context. The renderer programs only against `window.kept` — it never sees
// `ipcRenderer` or channel names.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('kept', kept)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.kept = kept
}

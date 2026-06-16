import { resolve } from 'path'
import { defineConfig } from 'electron-vite'
import react from '@vitejs/plugin-react'
import type { Plugin } from 'vite'

// Dev-only: relax the <meta> CSP in index.html to match the dev relaxations
// applied in src/main/index.ts (CSPs combine by intersection — both layers must
// agree). Two directives are widened for dev:
//   script-src — Vite Fast Refresh injects inline scripts + uses eval
//   connect-src — HMR WebSocket and the Vite dev server HTTP origin
// `apply: 'serve'` keeps the production build's <meta> untouched.
// Both replacements throw if the expected substring is absent — silent failures
// (blank dev window, no error message) are worse than a loud build error.
function devCspPlugin(): Plugin {
  return {
    name: 'kept-dev-csp',
    apply: 'serve',
    transformIndexHtml(html) {
      const afterScript = html.replace(
        /script-src 'self'/,
        "script-src 'self' 'unsafe-inline' 'unsafe-eval'"
      )
      if (afterScript === html) {
        throw new Error("[kept-dev-csp] script-src 'self' not found in index.html meta CSP")
      }
      const afterConnect = afterScript.replace(
        /connect-src 'self'/,
        "connect-src 'self' ws://localhost:* http://localhost:*"
      )
      if (afterConnect === afterScript) {
        throw new Error("[kept-dev-csp] connect-src 'self' not found in index.html meta CSP")
      }
      return afterConnect
    }
  }
}

export default defineConfig({
  main: {
    build: {
      rollupOptions: {
        external: ['better-sqlite3']
      }
    }
  },
  preload: {},
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src')
      }
    },
    plugins: [react(), devCspPlugin()]
  }
})

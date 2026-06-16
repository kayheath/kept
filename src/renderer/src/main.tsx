// Self-hosted fonts (bundled by Vite, served from 'self' — no network/CDN).
// Pixelify Sans is the full pixel-art display face (400/500/600); Inter 400 is
// the legibility fallback for longer body copy only. See DESIGN.md#Typography.
import '@fontsource/pixelify-sans/400.css'
import '@fontsource/pixelify-sans/500.css'
import '@fontsource/pixelify-sans/600.css'
import '@fontsource/inter/400.css'

import './styles/global.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

const rootEl = document.getElementById('root')
if (!rootEl) throw new Error('Root element #root is missing from index.html')
createRoot(rootEl).render(
  <StrictMode>
    <App />
  </StrictMode>
)

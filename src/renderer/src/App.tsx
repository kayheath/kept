import { useState } from 'react'
import { TitleBar, type Surface } from './components/TitleBar'

// The calm Home shell (Story 1.2): the pixel title bar + nav cluster over a
// quiet, warm-dark stage. Later stories fill the stage (focus card 1.6, clock
// 1.7, windowsill Epic 2, …). The selected surface is local component state —
// no Zustand store yet (Story 1.4), no capture page yet (Story 1.5).
//
// Design-Law guardrails on this surface: no red, no badges/counts/urgency, and
// the app's own chrome never addresses the user by name.
function App(): React.JSX.Element {
  const [activeSurface, setActiveSurface] = useState<Surface>('home')

  return (
    <div className="app-shell">
      <TitleBar activeSurface={activeSurface} onNavigate={setActiveSurface} />
      {/* A calm empty stage that breathes until later stories fill it. */}
      <main className="app-stage" />
    </div>
  )
}

export default App

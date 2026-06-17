import { useState } from 'react'
import { TitleBar, type Surface } from './components/TitleBar'
import { CapturePage } from './features/capture/CapturePage'

// The calm Home shell (Story 1.2): the pixel title bar + nav cluster over a
// quiet, warm-dark stage. The 'add' surface now renders the capture page
// (Story 1.5); later stories fill the home stage (focus card 1.6, clock 1.7,
// windowsill Epic 2, …). The selected surface stays local component state —
// navigation is deliberately not in the Zustand store yet (out of scope here).
//
// Design-Law guardrails on this surface: no red, no badges/counts/urgency, and
// the app's own chrome never addresses the user by name.
function App(): React.JSX.Element {
  const [activeSurface, setActiveSurface] = useState<Surface>('home')

  return (
    <div className="app-shell">
      <TitleBar activeSurface={activeSurface} onNavigate={setActiveSurface} />
      {activeSurface === 'add' ? (
        // A successful save (and Escape/back) returns to the calm Home.
        <CapturePage onClose={() => setActiveSurface('home')} />
      ) : (
        // A calm empty stage that breathes until later stories fill it.
        <main className="app-stage" />
      )}
    </div>
  )
}

export default App

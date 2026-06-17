import { useState } from 'react'
import { TitleBar, type Surface } from './components/TitleBar'
import { CapturePage } from './features/capture/CapturePage'
import { HomePage } from './features/home/HomePage'

// The calm Home shell (Story 1.2): the pixel title bar + nav cluster over a
// quiet, warm-dark stage. The 'add' surface renders the capture page (Story 1.5);
// the home/default surface now renders the focus card (Story 1.6). Later stories
// layer more onto Home (clock 1.7, windowsill Epic 2, …). The selected surface
// stays local component state — navigation is deliberately not in the Zustand
// store yet (out of scope here). Each surface owns its own <main> stage wrapper.
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
        // The calm Home surface: the focus card + next-hint, today-scoped.
        // HomePage renders its own <main> stage wrapper (mirroring CapturePage).
        <HomePage />
      )}
    </div>
  )
}

export default App

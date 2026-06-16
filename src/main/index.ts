import { app, BrowserWindow, session } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'

// Minimal Content-Security-Policy: the renderer may load only local content.
// No remote origins are permitted. 'unsafe-inline' for styles is required by
// Vite (dev) and our bespoke CSS; scripts stay restricted to 'self'.
const CSP = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self' data:",
  "connect-src 'self' ws://localhost:* http://localhost:*",
  // base-uri and form-action do not fall back to default-src, so pin them
  // explicitly; object-src 'none' blocks plugin/embed vectors.
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'"
].join('; ')

function createWindow(): void {
  // The single, resizable Kept window. Opens hidden until ready-to-show to
  // avoid a white flash, then reveals the calm placeholder Home.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    resizable: true,
    autoHideMenuBar: true,
    title: 'Kept',
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      // Electron hardening (AR7): the preload is the only bridge; the renderer
      // gets no Node access and runs sandboxed.
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  // Never open external/remote URLs from within the app (local-first, no network).
  mainWindow.webContents.setWindowOpenHandler(() => {
    return { action: 'deny' }
  })

  // setWindowOpenHandler only covers new windows. Also block in-place
  // navigation (link, location.assign, form submit) away from local content
  // so the trusted window can never be steered to a remote/file origin.
  mainWindow.webContents.on('will-navigate', (event, url) => {
    const isDevServer =
      is.dev &&
      process.env['ELECTRON_RENDERER_URL'] &&
      url.startsWith(process.env['ELECTRON_RENDERER_URL'])
    if (!isDevServer) {
      event.preventDefault()
    }
  })

  // HMR for renderer based on electron-vite cli.
  // Load the local dev server URL in development, or the local html file in production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.kept.app')

  // Enforce the CSP at the network layer as defense-in-depth alongside the
  // <meta> CSP in index.html — response headers cannot be overridden by content.
  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': [CSP]
      }
    })
  })

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

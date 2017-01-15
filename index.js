const electron = require('electron')
const {app, BrowserWindow, ipcMain, globalShortcut} = electron

const path = require('path')
const url = require('url')

//require('electron-reload')(__dirname)
require('electron-debug')({
  enabled: true
})
let mainWindow
function createWindow() {
  mainWindow = new BrowserWindow({width: 800, height: 600})
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))
  mainWindow.on('closed', () => {
    mainWindow = null
  })
  mainWindow.setMenu(null)
  mainWindow.webContents.send('window', mainWindow)
  globalShortcut.register('CommandOrControl+G', () => {
    mainWindow.webContents.send('globalShortcut', 'PickShortcut')
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  if (mainWindow === null) createWindow()
})
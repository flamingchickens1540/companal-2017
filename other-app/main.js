const electron = require('electron')
const AppDirectory = require('appdirectory')
const app = electron.app
const BrowserWindow = electron.BrowserWindow

const dataDir = new AppDirectory("companal-2017-otherapp").userData()
console.log(dataDir)

const path = require('path')
const url = require('url')
const fs = require('fs')

let mainWindow

function createWindow () {
  mainWindow = new BrowserWindow({width: 1200, height: 800})

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  //mainWindow.webContents.openDevTools()

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})

const electron = require('electron')
const AppDirectory = require('appdirectory')
const app = electron.app
const BrowserWindow = electron.BrowserWindow

const dataDir = new AppDirectory("companal-2017-analysis-simple").userData()
console.log(dataDir)

const path = require('path')
const url = require('url')
const fs = require('fs')

//now we'll verify that a data directory has been created (is this the app's first boot on this machine?)
try {
  fs.statSync(dataDir)
  //the dir exists
} catch (err) {
  console.log("initial boot, creating data dir")
  fs.mkdirSync(dataDir)
  fs.writeFileSync(`${dataDir}/config.json`, JSON.stringify({
    "myTeam": "1540"
  }))
  fs.writeFileSync(`${dataDir}/matchSchedule.json`, JSON.stringify({
      "1": ["1540", "1001", "1002", "1003", "1004", "1005"]
  }))
  fs.mkdirSync(`${dataDir}/pit-scouting`)
  fs.mkdirSync(`${dataDir}/stand-scouting`)
  fs.mkdirSync(`${dataDir}/tournament`)
  fs.writeFileSync(`${dataDir}/pit-scouting/manifest.json`, '[]')
  fs.writeFileSync(`${dataDir}/stand-scouting/manifest.json`, '[]')
}
//now we'll verify that they have non-corrupted versions of all the files we expect
try {
  var matchSchedule = JSON.parse(fs.readFileSync(`${dataDir}/matchSchedule.json`, 'utf8'))
  var config = JSON.parse(fs.readFileSync(`${dataDir}/config.json`, 'utf8'))
} catch (err) {
  console.log(`DATA DIRECTORY ERROR. ${dataDir}`)
  process.exit(1)
}
//now we'll validate config
attrs = ["myTeam"]
for (index in attrs) {
  attr = attrs[index]
  if (!config.hasOwnProperty(attr)) {
    console.log(`CONFIG ERROR. NO ATTR FOUND FOR ${attr}   ${dataDir}/config.json`)
    process.exit(2)
  }
}

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

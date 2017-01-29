var electron = require('electron')
var app = electron.app;
var BrowserWindow = BrowserWindow = electron.BrowserWindow;
var ipc = require("electron").ipcMain;
var fs = require('fs');

app.on('ready', function () {
	var mainWindow = new BrowserWindow({width:1000,height:800})
	mainWindow.loadURL('file://' + __dirname + '/index.html');
	ipc.on('read-file', function () {
		var contents = fs.readFileSync('./package.json', 'utf8');
		alert(contents);
	});
});

/* Other
	used: https://www.youtube.com/watch?v=K-H2amwQ_pU
	documentation: http://electron.atom.io/docs/api/browser-window/
	mainWindow.openDevTools();
*/
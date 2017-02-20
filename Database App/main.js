var app = require('app');
var fs = require('fs');
var BrowserWindow = require('browser-window');

app.on('ready', function () {
    var mainWindow = new BrowserWindow({width:800,height:600})
    mainWindow.loadURL('file://' + __dirname + '/index.html');
});
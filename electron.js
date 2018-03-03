var electron = require('electron')
var { BrowserWindow } = electron
var app = electron.app
var { join } = require('path')
var config = require('./assets/config')
var url = require('url')

var win
function showWindow (e) {
    win = new BrowserWindow()
    var views = e

    win.loadURL(e)
    win.on('closed', () => { win = null })
    win.show()
}

app.on('ready', function () {
    showWindow(`http://localhost:${config.port}/`)
})
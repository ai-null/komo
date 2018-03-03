var electron = require('electron')
var app = electron.app
var url = require('url')

var { BrowserWindow } = electron
var { join } = require('path')
var config = require('./assets/config')

var win
function showWindow (e) {
    win = new BrowserWindow()

    win.loadURL(url.format({
        pathname: join(__dirname, e),
        protocol: 'file',
        slashes: true
    }))
    win.on('closed', () => { win = null })
    win.show()
}

app.on('ready', function () {
    showWindow(`./views/index.html`)
})
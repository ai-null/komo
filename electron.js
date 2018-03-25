var electron = require('electron')
var app = electron.app
var url = require('url')

var { BrowserWindow } = electron
var { join } = require('path')
var config = require('./assets/config')

var win
function showWindow (e) {
    win = new BrowserWindow({
        width: 1080,
        height: 600,
        minWidth: 400,
        minHeight: 200
    })

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
var electron = require('electron')
var url = require('url')
var config = require('./assets/config') 

var { BrowserWindow, Menu, dialog, app, ipcRenderer } = electron
var { join } = require('path')
var {platform} = process.env

var win
let b = [{
    label: 'File',
    submenu: [{
        label: 'Open File',
        accelerator: config.open_files,
        click() {
            dialog.showOpenDialog({
                properties: ['OpenFile', 'OpenDirectory']
            }, function (files) {
                if (files) {
                    console.log(files)
                }
            })
        }
    }]
}]

function showWindow (a) {
    win = new BrowserWindow({
        width: 1080,
        height: 600,
        minWidth: 400,
        minHeight: 200
    })

    win.loadURL(url.format({
        pathname: join(__dirname, a),
        protocol: 'file',
        slashes: true
    }))

    Menu.setApplicationMenu(Menu.buildFromTemplate(b))

    win.on('closed', () => { win = null })
    win.show()
}

if (platform === 'darwin') {
    b.unshift({})
}

if (config.node_env === 'development') {
    b.push({
        label: 'Developer tools',
        submenu: [{
            label: 'toggle devtools',
            accelerator: config.open_devtools,
            click(item, focusedWindow) {
                focusedWindow.toggleDevTools()
            }
        }]
    })
} else {
    b.pop()
}

app.on('ready', function () {
    showWindow(`./views/index.html`)
})
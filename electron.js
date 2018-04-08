let electron = require('electron')
let url = require('url')
let config = require('./assets/config')

let {BrowserWindow, Menu, dialog, app, ipcMain} = electron
let {join} = require('path')
let {platform} = process.env

require('events').EventEmitter.defaultMaxListeners = 15

let win
let b = [{
    label: 'File',
    submenu: [{
        label: 'Open File',
        accelerator: config.open_files,
        click() {
            dialog.showOpenDialog({
                properties: ['openFile', 'multiSelections'],
                filters: [
                    {name: 'Videos', extensions: ['mp4', 'mkv', 'avi']},
                    {name: 'Music', extensions: ['mp3', 'opus', 'aac', 'm4a']}
                ]
            }, function (files) {
                if (files) {
                    win.webContents.send('open-file', files[0])
                    win.webContents.send('kntl', files)
                }
            })
        }
    }]
}]

function showWindow(a) {
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

    // win.webContents.send('open-file', )

    win.on('closed', () => {
        win = null
    })

    let menus = Menu.buildFromTemplate(b)
    Menu.setApplicationMenu(menus)

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
        }, {
            label: 'reload',
            accelerator: config.reload,
            role: 'reload'
        }]
    })
} else {
    b.pop()
}

app.on('window-all-closed', function () {
    app.quit()
})

app.on('ready', function () {
    showWindow(`./views/index.html`)
})
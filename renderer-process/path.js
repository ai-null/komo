let electron = window.require('electron')
let {ipcRenderer} = electron || electron.remote
// =============== //
// let electron = require('electron')
// let {app, ipcRenderer, Menu, MenuItem} = electron.remote


module.exports = {
    getFilePath : function () {
        ipcRenderer.on('open-file', (e, file) => {
            return file
        })
    }
}
let electron = window.require('electron')
let {ipcRenderer} = electron || electron.remote


module.exports = {
    getFilePath : function () {
        ipcRenderer.on('open-file', function (e, data) {
            return data
        })
    }
}
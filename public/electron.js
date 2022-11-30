const {app, BrowserWindow} = require('electron')
const isDev = require('electron-is-dev');
const path = require('path')

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        minWidth: 700,
        minHeight: 580,
        autoHideMenuBar: true,
        icon: 'src/images/icon.png',
        webPreferences: {
            contextIsolation: false,
            nodeIntegration: true
        }
    })
    mainWindow.loadURL(isDev
        ? 'http://localhost:3000'
        : `file://${path.join(__dirname, '../build.index.html')}`
    ).then(res => res)
}


app.whenReady().then(() => {
    createWindow()

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})
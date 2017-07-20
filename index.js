const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const url = require('url');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        left: 0,
        top: 0,
        width: 500,
        height: 128,
        transparent: true,
        frame: false,
        resizable: false,
        hasShadow: false,
    });
    mainWindow.setAlwaysOnTop(true);
    mainWindow.setVisibleOnAllWorkspaces(true);

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }));
    
//    mainWindow.openDevTools({ mode: "detach" });

    mainWindow.on('closed', () => {
        win = null
    });

    ipcMain.on("moveWindow", (ev, x, y) => {
        rect = mainWindow.getBounds();
        rect.x = x;
        rect.y = y;
        mainWindow.setBounds(rect);
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow()
    }
});
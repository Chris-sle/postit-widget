import { app, BrowserWindow } from 'electron';
import path from 'path';

function createWindow() {
    const win = new BrowserWindow({
        width: 300,
        height: 400,
        frame: false,
        transparent: true,
        alwaysOnTop: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            preload: path.join(app.getAppPath(), 'preload.js'), // Optional, if you're using a preload script.
        },
    });

    win.loadFile('dist/index.html'); // Make sure this path points to the built Vue file.
}

app.whenReady().then(createWindow);
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
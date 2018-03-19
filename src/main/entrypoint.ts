'use strict';

import { app, BrowserWindow, Menu } from 'electron';
import createBrowserWindow from './Helpers/Window';

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
    // tslint:disable-next-line
    (<any>global).__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow: BrowserWindow | null;
const mainWindowUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:9080' : `file://${__dirname}/index.html`;
console.error(process.env.NODE_ENV);
function createWindow() {

    Menu.setApplicationMenu(null);

    mainWindow = createBrowserWindow('main', {
        height: 600,
        width: 1000,
        useContentSize: true,
        resizable: false,
        frame: false
    });

    mainWindow.loadURL(mainWindowUrl);

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    app.quit();
    // Quit on darwin as well?
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
})
'use strict';

const {app} = require('electron');

let mainWindow;

function createWindow () {

    mainWindow = require('main/window')();

};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
//     require('main/tray')();
    createWindow();
//     app.dock.hide();
});

app.on('activate', () => {
    console.log('activate');
    if (!mainWindow || mainWindow.isVisible()) return;
    return mainWindow.show();
});

app.on('browser-window-focus', () => {
    console.log('focused!');
});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('will-quit', () => {
    console.log('will-quit');
});

app.on('quit', () => {
    console.log('quit');
});

app.on('activate', function () {
    if (mainWindow === null) {
        createWindow();
    }
});

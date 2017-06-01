'use strict';

const electron = require('electron');
const { app, BrowserWindow, globalShortcut, Menu } = electron;
const path = require('path');
const url = require('url');
const preferences = require('./preferences');
const _ = require('lodash');

let mainWindow;

module.exports = () => {

    if (mainWindow) return mainWindow;

    let width = preferences.get('width') || 800;
    let height = preferences.get('height') || 600;

    let iconPath = path.join(app.getAppPath(), 'assets/icon.png');

    mainWindow = new BrowserWindow({
        'width': width,
        'height': height,
        'icon': iconPath
//         'show': true,
//         'skipTaskbar': true
    });

//     app.dock.setIcon(iconPath);

//     mainWindow.setClosable(false);

    mainWindow.on('focus', () => {
        console.log('window.focus');
    });

    mainWindow.on('resize', _.debounce((e) => {
        const size = mainWindow.getSize();
        preferences.set({
            'width': size[0],
            'height': size[1]
        });
    }, 2000));

    mainWindow.on('minimize', (e) => {
//         console.log('minimize');
        e.preventDefault();
        mainWindow.hide();
    });

    globalShortcut.register('CommandOrControl+Alt+X', () => {
        if (mainWindow.isVisible()) {
            Menu.sendActionToFirstResponder('hide:');
        } else {
            mainWindow.show();
        }
    });

    mainWindow.loadURL(url.format({
        'pathname': path.join(__dirname, '../..', 'www', 'index.html'),
        'protocol': 'file:',
        'slashes': true
    }));

    mainWindow.on('closed', function () {
        console.log('closed');
        mainWindow = null;
    });

    module.exports = mainWindow;

    return mainWindow;

};

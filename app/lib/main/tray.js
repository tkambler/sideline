'use strict';

const { app, Menu, Tray } = require('electron');
const path = require('path');
const iconPath = path.join(__dirname, '../../rocket16.png');

module.exports = () => {

    let appIcon = new Tray(iconPath);
    var contextMenu = Menu.buildFromTemplate([
        {
            'label': 'Toggle Scratchbox',
            'accelerator': 'CommandOrControl+A',
            'icon': iconPath,
            'click': () => {

                let mainWindow = require('main/window');

                if (mainWindow.isVisible()) {
                    return mainWindow.hide();
                } else {
                    return mainWindow.show();
                }

            }
        },
        {
            'label': 'Quit',
            'click': () => {
                console.log('quit');
                return app.quit();
            }
        }
    ]);
    appIcon.setToolTip('Tray App');
    appIcon.setContextMenu(contextMenu);

    module.exports = appIcon;
    return appIcon;

};

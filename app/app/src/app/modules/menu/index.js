'use strict';

const angular = require('angular');
const mod = angular.module('Menu', [
    'lodash',
    'preferences',
]);

mod.factory('Menu', function(editor, $log, preferences, _) {

    const electron = require('electron')
    const {Menu, app} = require('electron').remote;

    const template = [
      {
        label: 'Edit',
        submenu: [
          {
            role: 'undo'
          },
          {
            role: 'redo'
          },
          {
            type: 'separator'
          },
          {
            role: 'cut'
          },
          {
            role: 'copy'
          },
          {
            role: 'paste'
          },
          {
            role: 'pasteandmatchstyle'
          },
          {
            role: 'delete'
          },
          {
            role: 'selectall'
          }
        ]
      },
      {
        label: 'View',
        id: 'view',
        submenu: [
            {
                'label': 'Theme',
                'submenu': (() => {

                    return editor.themes.map((theme) => {

                        return {
                            'label': theme.label,
                            'checked': (theme.name === preferences.get('theme')),
                            'type': 'radio',
                            'click': () => {
                                editor.setTheme(theme.name);
                                return preferences.set('theme', theme.name);
                            }
                        };

                    });

                })()
            },
          {
            'label': 'Show Print Margin',
            'id': 'show_print',
            'type': 'checkbox',
            'checked': !!preferences.get('show_print_margin'),
            'click': () => {
                let _menu = _.find(menu.items, {
                    'id': 'view'
                });
                let item = _.find(_menu.submenu.items, {
                    'id': 'show_print'
                });
                editor.setShowPrintMargin(item.checked);
                preferences.set('show_print_margin', item.checked);
            }
          },
          {
            'label': 'Highlight Active Line',
            'id': 'highlight_active_line',
            'type': 'checkbox',
            'checked': !!preferences.get('highlight_active_line'),
            'click': () => {
                let _menu = _.find(menu.items, {
                    'id': 'view'
                });
                let item = _.find(_menu.submenu.items, {
                    'id': 'highlight_active_line'
                });
                preferences.set('highlight_active_line', item.checked);
                editor.setHighlightActiveLine(item.checked);
            }
          },
          {
            'label': 'Show Gutter',
            'id': 'show_gutter',
            'type': 'checkbox',
            'checked': !!preferences.get('show_gutter'),
            'click': function() {
                console.log('this', this);
                let _menu = _.find(menu.items, {
                    'id': 'view'
                });
                let item = _.find(_menu.submenu.items, {
                    'id': 'show_gutter'
                });
                preferences.set('show_gutter', item.checked);
                editor.setShowGutter(item.checked);
            }
          },
          {
            label: 'Reload',
            accelerator: 'CmdOrCtrl+R',
            click (item, focusedWindow) {
              if (focusedWindow) focusedWindow.reload()
            }
          },
          {
            label: 'Toggle Developer Tools',
            accelerator: process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
            click (item, focusedWindow) {
              if (focusedWindow) focusedWindow.webContents.toggleDevTools()
            }
          },
          {
            type: 'separator'
          },
          {
            role: 'resetzoom'
          },
          {
            role: 'zoomin'
          },
          {
            role: 'zoomout'
          },
          {
            type: 'separator'
          },
          {
            role: 'togglefullscreen'
          }
        ]
      },
      {
        role: 'window',
        submenu: [
          {
            role: 'minimize'
          },
          {
            role: 'close'
          }
        ]
      },
      {
        role: 'help',
        submenu: [
          {
            label: 'Learn More',
            click () { require('electron').shell.openExternal('http://electron.atom.io') }
          }
        ]
      }
    ]

    if (process.platform === 'darwin') {
      const name = app.getName()
      template.unshift({
        label: name,
        submenu: [
          {
            role: 'about'
          },
          {
            type: 'separator'
          },
          {
            role: 'services',
            submenu: []
          },
          {
            type: 'separator'
          },
          {
            role: 'hide'
          },
          {
            role: 'hideothers'
          },
          {
            role: 'unhide'
          },
          {
            type: 'separator'
          },
          {
            role: 'quit'
          }
        ]
      })
      // Edit menu.
      template[1].submenu.push(
        {
          type: 'separator'
        },
        {
          label: 'Speech',
          submenu: [
            {
              role: 'startspeaking'
            },
            {
              role: 'stopspeaking'
            }
          ]
        }
      )
      // Window menu.
      template[3].submenu = [
        {
          label: 'Close',
          accelerator: 'CmdOrCtrl+W',
          role: 'close'
        },
        {
          label: 'Minimize',
          accelerator: 'CmdOrCtrl+M',
          role: 'minimize'
        },
        {
          label: 'Zoom',
          role: 'zoom'
        },
        {
          type: 'separator'
        },
        {
          label: 'Bring All to Front',
          role: 'front'
        }
      ]
    }

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

    return Menu;

});

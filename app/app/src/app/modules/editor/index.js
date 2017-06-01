'use strict';
/* global ace */

const angular = require('angular');

const mod = angular.module('editor', [
    'fs',
    'underscore.string',
    'lodash',
    'preferences'
]);

const $ = require('jquery');
const Promise = require('bluebird');
const path = require('path');
const {app} = require('electron').remote;
const dataPath = app.getPath('userData');
const target = path.join(dataPath, 'data.json');

ace.EditSession.prototype.$useWorker = false;
ace.config.set('basePath', 'file://' + path.join(app.getAppPath(), 'www', 'ace'));

mod.component('editor', {
    'bindings': {},
    'template': require('fs').readFileSync(__dirname + '/templates/editor.html', 'utf8'),
    'controller': function($log, $element, editor, $timeout, preferences) {

        this.$onInit = () => {

            $log.debug('editor.$onInit', this);
            this.theme = preferences.get('theme') || 'textmate';
            editor.registerEditor(this);

        };

        this.$postLink = () => {
        };

        this.aceLoaded = (aceEditor) => {
            this.editor = aceEditor;
            this.editor.$blockScrolling = Infinity;
            this.setShowPrintMargin(!!preferences.get('show_print_margin'));
            this.setHighlightActiveLine(!!preferences.get('highlight_active_line'));
            this.setShowGutter(!!preferences.get('show_gutter'));
            editor._load()
                .then((data) => {
                    this.editor.setValue(data.contents);
                    $log.debug('Loaded.');
                    this.editor.focus();
                    this.editor.navigateFileEnd();
                });
        };

        this.aceChanged = (e) => {
            return editor._save(this.editor.getValue());
        };

        this.setTheme = (theme) => {
            this.editor.setTheme(theme);
        };

        this.setShowPrintMargin = (show) => {
            this.editor.setShowPrintMargin(show);
            return this;
        };

        this.setHighlightActiveLine = (val) => {
            this.editor.setHighlightActiveLine(val);
            return this;
        };

        this.setShowGutter = (val) => {
            this.editor.renderer.setShowGutter(val);
            return this;
        };

    }
});

mod.factory('editor', function($log, _s, _, preferences, fs) {

    class Api {

        constructor() {

            this._saveDebounced = _.debounce((contents) => {
                if (contents === this.latestContents) return;
                $log.debug('Saving');
                const data = {
                    'contents': contents
                };
                return fs.writeFileAsync(target, JSON.stringify(data, null, 4))
                    .then(() => {
                        this.latestContents = contents;
                        $log.debug('Saved.');
                    });
            }, 1000);

        }

        registerEditor(editor) {
            this.editor = editor;
        }

        _save(contents) {
            return this._saveDebounced(contents);
        }

        _load() {
            return fs.readFileAsync(target, 'utf8')
                .then((data) => {
                    try {
                        data = JSON.parse(data);
                        this.latestContents = data.contents;
                        return data;
                    } catch(e) {
                        $log.debug('Load error', e);
                    }
                })
                .catch((err) => {
                    $log.debug('Load error', err);
                });
        }

        get themes() {
            return _(require('./themes')).cloneDeep().map((theme) => {
                return {
                    'label': _s(theme).humanize().titleize().value(),
                    'name': theme
                };
            });
        }

        get theme() {
            return preferences.get('theme');
        }

        setTheme(theme) {
            return Promise.resolve()
                .then(() => {
                    if (require('./themes').indexOf(theme) === -1) {
                        throw new Error(`Unknown theme: ${theme}`);
                    }
                    this.editor.setTheme(`ace/theme/${theme}`);
                });
        }

        setShowPrintMargin(show) {
            this.editor.setShowPrintMargin(show);
            return this;
        }

        setHighlightActiveLine(val) {
            this.editor.setHighlightActiveLine(val);
            return this;
        }

        setShowGutter(val) {
            this.editor.setShowGutter(val);
            return this;
        }

    }

    return new Api();

});

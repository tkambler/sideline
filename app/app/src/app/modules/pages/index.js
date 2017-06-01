'use strict';

const angular = require('angular');
const mod = angular.module('pages', []);

mod.component('pages', {
    'bindings': {},
    'template': require('fs').readFileSync(__dirname + '/templates/editor.html', 'utf8'),
    'controller': function($log, $element) {

        this.$onInit = () => {
        };

        this.$postLink = () => {
        };

    }
});

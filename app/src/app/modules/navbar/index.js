'use strict';

const angular = require('angular');
const mod = angular.module('navbar', []);

mod.component('navbar', {
    'bindings': {},
    'template': require('fs').readFileSync(__dirname + '/templates/navbar.html', 'utf8'),
    'controller': function($log, $element) {

        this.$onInit = () => {
        };

        this.$postLink = () => {
        };

    }
});

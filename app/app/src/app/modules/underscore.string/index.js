'use strict';

const angular = require('angular');
const mod = angular.module('underscore.string', []);

mod.factory('_s', function() {
    return require('underscore.string');
});

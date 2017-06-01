'use strict';

const angular = require('angular');
const mod = angular.module('lodash', []);

mod.factory('_', function() {
    return require('lodash');
});

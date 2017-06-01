'use strict';

const angular = require('angular');
const mod = angular.module('fs', []);

mod.factory('fs', function() {
    return Promise.promisifyAll(require('fs'));
});

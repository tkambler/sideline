'use strict';

const angular = require('angular');
const mod = angular.module('preferences', []);
const {remote} = require('electron');

mod.factory('preferences', function() {

    return remote.require('main/preferences');

});

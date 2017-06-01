'use strict';

const angular = window.angular = require('angular');
require('angular-sanitize');
require('angular-route');
require('angular-ui-ace');
const bulk = require('bulk-require');

const app = module.exports = angular.module('app', [
    'editor',
    'fs',
    'pages',
    'preferences',
    'lodash',
    'Menu',
    'navbar',
    'ngRoute',
    'ngSanitize',
    'ui.ace',
    'underscore.string',
]);

const extras = bulk(__dirname, [
    'components/*',
    'modules/*'
]);

app.config(function($routeProvider) {

    $routeProvider.when('/home', {
        'template': `<home-route></home-route>`
    });

    $routeProvider.otherwise('/home');

});

app.run(($rootScope, $log, Menu) => {

    $log.debug('app is running');

    Promise.setScheduler((cb) => {
        $rootScope.$evalAsync(cb);
    });

});

'use strict';

module.exports = (grunt) => {

    let path = require('path');
    let bluebird = require('bluebird');
    grunt.util.spawnAsync = bluebird.promisify(grunt.util.spawn);
    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt, {
        'pattern': [
            'grunt-*'
        ]
    });

    grunt.config.init({
        'app': {
            'dir': path.join(__dirname, 'app')
        }
    });

    grunt.loadTasks('tasks');
    grunt.registerTask('compile', []);

};

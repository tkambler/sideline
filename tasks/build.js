'use strict';

module.exports = (grunt) => {

    grunt.registerTask('build', function() {

        let done = this.async();
        let os = require('os');
        let _ = require('lodash');
        let spawn = require('cross-spawn-async');
        let env = _.cloneDeep(process.env);
        let path = require('path');
        let appPkg = require(path.resolve(__dirname, '..', 'app', 'package.json'));
        grunt.option('arch', grunt.option('arch') || 'x64');
        let spawnCmd;

        if (grunt.option('beta')) {
            appPkg.version = appPkg.version.split('-')[0] + '-beta';
            grunt.file.write('app/package.json', JSON.stringify(appPkg, null, 4));
        } else {
            appPkg.version = appPkg.version.split('-')[0];
            grunt.file.write('app/package.json', JSON.stringify(appPkg, null, 4));
        }

        switch (os.platform()) {

            case 'darwin':

                grunt.log.writeln(`Building for platform / architecture: ${os.platform()} / ${grunt.option('arch')}`);

                if (grunt.option('arch') !== 'x64') {
                    return grunt.fatal(new Error(`Unknown platform / architecture: ${os.platform()} / ${grunt.option('arch')}`));
                }
                spawnCmd = 'dist:osx';

            break;

        }

        grunt.verbose.writeln(`Spawning command: npm run ${spawnCmd}`);

        let spawned = spawn('npm', [
            'run',
            spawnCmd
        ], {
            'env': env
        });

        spawned.stdout.on('data', (data) => {
            grunt.log.writeln(data);
        });

        spawned.stderr.on('data', (data) => {
            grunt.log.writeln(data);
        });

        spawned.on('close', (code) => {
            if (code !== 0) {
                return grunt.fatal(new Error('Electron exited with status code: ' + code.toString()));
            }
            done();
        });

    });

};

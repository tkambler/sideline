'use strict';

module.exports = (grunt) => {

    require('time-grunt')(grunt);

    require('load-grunt-tasks')(grunt, {
        'pattern': [
            'grunt-*'
        ]
    });

    grunt.initConfig({
        'pkg': require('./package.json'),
        'concat': {
            'options': {
                'separator': ';\n',
                'process': (src, filepath) => {
                    grunt.verbose.writeln('Concating: %s', filepath);
                    return '/** FILE: ' + filepath + ' **/\n' + src;
                }
            },
            'dist': {
                'src': [
                    'node_modules/jquery/dist/jquery.js',
                    'node_modules/ace-min-noconflict/ace.js',
                    'node_modules/bluebird/js/browser/bluebird.js',
                ],
                'dest': 'www/js/concat.js'
            }
        },
        'concat-verify': {
            'dist': {}
        },
        'browserify': {
            'options': {
                'src': [],
                'dest': null,
                'paths': [],
                'external': [],
                'exclude': [],
                'require': [],
                'babelify': {
                    'enable': false
                },
                'noParse': [],
                'extensions': ['.js', '.json']
            },
            'app': {
                'options': {
                    'src': ['src/index.js'],
                    'dest': 'www/js/app.bundle.js',
                    'paths': ['src'],
                    'exclude': [],
                    'babelify': {
                        'enable': true,
                        'options': {
                            'extensions': ['.js'],
                            'presets': [],
                            'plugins': [
                                'babel-plugin-check-es2015-constants',
                                'babel-plugin-transform-es2015-arrow-functions',
                                'transform-es2015-block-scoped-functions',
                                'transform-es2015-block-scoping',
                                'transform-es2015-classes',
                                'transform-es2015-computed-properties',
                                'transform-es2015-destructuring',
                                'transform-es2015-duplicate-keys',
                                'transform-es2015-for-of',
                                'transform-es2015-literals',
                                'transform-es2015-modules-commonjs',
                                'transform-es2015-object-super',
                                'transform-es2015-parameters',
                                'transform-es2015-shorthand-properties',
                                'transform-es2015-spread',
                                'transform-es2015-sticky-regex',
                                'transform-es2015-template-literals',
                                'transform-es2015-typeof-symbol',
                                'transform-es2015-unicode-regex',
                                'transform-regenerator'
                            ]
                        }
                    }
                }
            }
        },
        'compass': {
            'all': {
                'options': {
                    'httpPath': '/',
                    'cssDir': 'www/css',
                    'sassDir': 'scss',
                    'imagesDir': 'www/img',
                    'relativeAssets': true,
                    'outputStyle': 'compressed',
                    'specify': [
                        'scss/style.scss'
                    ],
                    'importPath': [
                        'node_modules'
                    ]
                }
            }
        },
        'watch': {
            'scss': {
                'files': [
                    'scss/**/*'
                ],
                'tasks': [
                    'compass'
                ],
                'options': {
                    'interrupt': true
                }
            }
        },
        'clean': {
            'fonts': ['www/fonts']
        },
        'copy': {
            'fonts': {
                'files': [
                    {
                        'expand': true,
                        'cwd': 'node_modules/opensans-npm-webfont/fonts',
                        'src': '**/*',
                        'dest': 'www/fonts'
                    },
                    {
                        'expand': true,
                        'cwd': 'node_modules/font-awesome/fonts',
                        'src': '**/*',
                        'dest': 'www/fonts'
                    },
                    {
                        'expand': true,
                        'cwd': 'node_modules/bootstrap-sass/assets/fonts/bootstrap',
                        'src': '**/*',
                        'dest': 'www/fonts'
                    },
                    {
                        'expand': true,
                        'cwd': 'node_modules/ace-min-noconflict',
                        'src': '**/*',
                        'dest': 'www/ace'
                    },
                    {
                        'expand': true,
                        'cwd': 'src',
                        'src': '**/*',
                        'dest': 'app/src'
                    },
                ]
            }
        },
        'connect': {
            'server': {
                'options': {
                    'port': 9090,
                    'base': 'www',
                    'keepalive': true
                }
            }
        },
        'concurrent': {
            'build': {
                'tasks': [
                    'watch', 'browserify', 'connect'
                ],
                'options': {
                    'logConcurrentOutput': true
                }
            }
        }
    });

//     grunt.registerTask('build', ['clean', 'copy', 'compass', 'concat-verify', 'concat']);
    grunt.registerTask('build', ['clean', 'copy', 'compass', 'concat-verify', 'concat']);
    grunt.registerTask('default', ['build', 'concurrent']);
    grunt.loadTasks('tasks');

};

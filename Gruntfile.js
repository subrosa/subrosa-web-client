/*global module*/
//TODO add i18n and static page generation for search engines.
'use strict';
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {
    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // configurable paths
    var subrosaConfig = {
        app: 'app',
        build: 'build'
    };

    try {
        subrosaConfig.app = require('./component.json').appPath || subrosaConfig.app;
    } catch (e) {}

    grunt.initConfig({
        subrosa: subrosaConfig,
        watch: {
            livereload: {
                files: [
                    '<%= subrosa.app %>/{,*/}*.html',
                    '{.tmp,<%= subrosa.app %>}/css/{,*/}*.css',
                    '{.tmp,<%= subrosa.app %>}/js/{,*/}*.js',
                    '<%= subrosa.app %>/img/{,*/}*.{png,jpg,jpeg,gif,webp}'
                ],
                tasks: ['livereload']
            }
        },
        connect: {
            livereload: {
                options: {
                    port: 9000,
                    // Change this to '0.0.0.0' to access the server from outside.
                    hostname: 'localhost',
                    middleware: function (connect) {
                        return [
                            lrSnippet,
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, subrosaConfig.app)
                        ];
                    }
                }
            },
            test: {
                options: {
                    port: 9000,
                    middleware: function (connect) {
                        return [
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, 'test')
                        ];
                    }
                }
            }
        },
        open: {
            server: {
                url: 'http://localhost:<%= connect.livereload.options.port %>'
            }
        },
        clean: {
            build: ['.tmp', '<%= subrosa.build %>'],
            server: '.tmp'
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                '<%= subrosa.app %>/js/{,*/}*.js'
            ]
        },
        karma: {
            unit: {
                configFile: 'config/karma.conf.js',
                singleRun: true
            }
        },
        useminPrepare: {
            html: '<%= subrosa.app %>/index.html',
            options: {
                dest: '<%= subrosa.build %>'
            }
        },
        usemin: {
            html: ['<%= subrosa.build %>/{,*/}*.html'],
            css: ['<%= subrosa.build %>/css/{,*/}*.css'],
            options: {
                dirs: ['<%= subrosa.build %>']
            }
        },
        imagemin: {
            build: {
                files: [{
                    expand: true,
                    cwd: '<%= subrosa.app %>/img',
                    src: '{,*/}*.{png,jpg,jpeg}',
                    dest: '<%= subrosa.build %>/img'
                }]
            }
        },
        cssmin: {
            build: {
                files: {
                    '<%= subrosa.build %>/css/app.css': [
                        '.tmp/css/{,*/}*.css',
                        '<%= subrosa.app %>/css/{,*/}*.css'
                    ]
                }
            }
        },
        htmlmin: {
            build: {
                files: [{
                    expand: true,
                    cwd: '<%= subrosa.app %>',
                    src: ['*.html', 'views/*.html'],
                    dest: '<%= subrosa.build %>'
                }]
            }
        },
        cdnify: {
            build: {
                html: ['<%= subrosa.build %>/*.html']
            }
        },
        ngmin: {
            build: {
                files: [{
                    expand: true,
                    cwd: '<%= subrosa.build %>/js',
                    src: '*.js',
                    dest: '<%= subrosa.build %>/js'
                }]
            }
        },
        ngtemplates: {
            subrosa: {
                options:    {
                    base: '<%= subrosa.app %>/views',        // $templateCache ID will be relative to this folder
                    prepend: '/views/'                       // Prepend path to $templateCache ID
                },
                src: [ '<%= subrosa.app %>/views/{,*/}*.html' ],
                dest: '.tmp/js/templates.js'
            }
        },
        // Concatenate the resultant template cache to the scripts file.
        concat: {
            templates: {
                files: {
                    '<%= subrosa.build %>/js/scripts.js': [
                        '<%= subrosa.build %>/js/scripts.js',
                        '<%= ngtemplates.subrosa.dest %>'
                    ]
                }
            }
        },
        uglify: {
            build: {
                files: {
                    '<%= subrosa.build %>/js/scripts.js': [
                        '<%= subrosa.build %>/js/scripts.js'
                    ]
                }
            }
        },
        copy: {
            build: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= subrosa.app %>',
                    dest: '<%= subrosa.build %>',
                    src: [
                        '*.{ico,txt,png}',
                        'img/{,*/}*.{gif,webp}'
                    ]
                }]
            }
        }
    });

    grunt.renameTask('regarde', 'watch');
    // remove when mincss task is renamed
    grunt.renameTask('mincss', 'cssmin');

    grunt.registerTask('server', [
        'clean:server',
        'livereload-start',
        'connect:livereload',
        'open',
        'watch'
    ]);

    grunt.registerTask('test', [
        'clean:server',
        'connect:test',
        'karma'
    ]);

    grunt.registerTask('build', [
        'clean:build',
        'jshint',
        'test',
        'useminPrepare',
        'imagemin',
        'cssmin',
        'htmlmin',
        'ngtemplates',
        'concat',
        'concat:templates',
        'copy',
//        'cdnify',
        'usemin',
        'ngmin',
        'uglify'
    ]);

    grunt.registerTask('default', ['build']);
};
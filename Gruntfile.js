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

    // proxy and modrewrite to support standalone server
    var modRewrite = require('connect-modrewrite');
    var proxySnippet = require('grunt-connect-proxy/lib/utils').proxyRequest;

    // configurable paths
    var subrosaConfig = {
        src: 'src',
        dist: 'dist'
    };

    try {
        subrosaConfig.src = require('./bower.json').appPath || subrosaConfig.src;
    } catch (e) {}

    grunt.initConfig({
        subrosa: subrosaConfig,
        watch: {
            livereload: {
                files: [
                    '<%= subrosa.src %>/**/*.html',
                    '{.tmp,<%= subrosa.src %>}/css/**/*.css',
                    '{.tmp,<%= subrosa.src %>}/js/**/*.js',
                    '<%= subrosa.src %>/img/**/*.{png,jpg,jpeg,gif,webp}'
                ],
                tasks: ['livereload']
            }
        },
        connect: {
            proxies: [
                {
                    context: '/subrosa',
                    host: 'localhost',
                    port: 8080
                },

                {
                    context: '/photos',
                    host: 'localhost',
                    port: 80
                }
            ],
            livereload: {
                options: {
                    port: 9000,
                    // Change this to '0.0.0.0' to access the server from outside.
                    hostname: 'localhost',
                    middleware: function (connect) {
                        return [
                            modRewrite([
                                '!^/(css|js|img|photos|components|views|subrosa).+$ /index.html'

                            ]),
                            proxySnippet,
                            lrSnippet,
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, subrosaConfig.src)
                        ];
                    }
                }
            },
            test: {
                options: {
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
            build: '<%= subrosa.dist %>',
            tmp: '.tmp'
        },
        csslint: {
            options: {
                csslintrc: '.csslintrc'
            },
            src: ['<%= subrosa.src %>/css/**/*.css', '!<%= subrosa.src %>/css/lib/**/*.css']
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                '<%= subrosa.src %>/js/**/*.js',
                '!<%= subrosa.src %>/components/**/*.js'
            ]
        },
        karma: {
            server: {
                browsers: ['PhantomJS'],
                configFile: 'test/config/karma.conf.js',
                autoWatch: true
            },
            unit: {
                configFile: 'test/config/karma.conf.js',
                autoWatch: true
            },
            e2e: {
                configFile: 'test/config/karma-e2e.conf.js'
            },
            //continuous integration modes: run tests once in PhantomJS browser.
            singleRunUnit: {
                browsers: ['PhantomJS'],
                configFile: 'test/config/karma.conf.js',
                singleRun: true
            },
            singleRunE2E: {
                browsers: ['PhantomJS'],
                configFile: 'test/config/karma-e2e.conf.js',
                singleRun: true
            }
        },
        useminPrepare: {
            html: '<%= subrosa.src %>/index.html',
            options: {
                dest: '<%= subrosa.dist %>'
            }
        },
        usemin: {
            html: ['<%= subrosa.dist %>/**/*.html'],
            css: ['<%= subrosa.dist %>/css/**/*.css'],
            options: {
                dirs: ['<%= subrosa.dist %>']
            }
        },
        imagemin: {
            build: {
                files: [{
                    expand: true,
                    cwd: '<%= subrosa.src %>/img',
                    src: '**/*.{png,jpg,jpeg}',
                    dest: '<%= subrosa.dist %>/img'
                }]
            }
        },
        cssmin: {
            build: {
                files: {
                    '<%= subrosa.dist %>/css/styles.css': [
                        '.tmp/css/**/*.css',
                        '<%= subrosa.src %>/css/**/*.css'
                    ]
                }
            }
        },
        htmlmin: {
            build: {
                files: [{
                    expand: true,
                    cwd: '<%= subrosa.src %>',
                    src: ['*.html', 'views/**/*.html'],
                    dest: '<%= subrosa.dist %>'
                }]
            }
        },
        cdnify: {
            build: {
                html: ['<%= subrosa.dist %>/*.html']
            }
        },
        ngmin: {
            build: {
                files: [{
                    expand: true,
                    cwd: '<%= subrosa.dist %>/js',
                    src: '*.js',
                    dest: '<%= subrosa.dist %>/js'
                }]
            }
        },
        ngtemplates: {
            subrosa: {
                options:    {
                    base: '<%= subrosa.src %>'       // $templateCache ID will be relative to this folder
                },
                src: [ '<%= subrosa.src %>/js/**/*.html' ],
                dest: '.tmp/js/templates.js'
            }
        },
        // Concatenate the resultant template cache to the scripts file.
        concat: {
            templates: {
                files: {
                    '<%= subrosa.dist %>/js/scripts.js': [
                        '<%= subrosa.dist %>/js/scripts.js',
                        '<%= ngtemplates.subrosa.dest %>'
                    ]
                }
            }
        },
        uglify: {
            build: {
                files: {
                    '<%= subrosa.dist %>/js/scripts.js': [
                        '<%= subrosa.dist %>/js/scripts.js'
                    ]
                }
            }
        },
        copy: {
            build: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= subrosa.src %>',
                    dest: '<%= subrosa.dist %>',
                    src: [
                        '*.{ico,txt,png}',
                        'img/**/*.{gif,webp}'
                    ]
                }]
            }
        }
    });

    grunt.renameTask('regarde', 'watch');
    // remove when mincss task is renamed
    grunt.renameTask('mincss', 'cssmin');

    grunt.registerTask('server', [
        'clean:tmp',
        'configureProxies',
        'livereload-start',
        'connect:livereload',
        'open',
        'watch'
    ]);

    grunt.registerTask('test', [
        'connect:test',
        'karma:singleRunUnit',
        'karma:singleRunE2E'
    ]);

    grunt.registerTask('test:server', [
        'connect:test',
        'karma:server'
    ]);

    grunt.registerTask('build', [
        'clean:build',
        'csslint',
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
        'uglify',
        'clean:tmp'
    ]);

    grunt.registerTask('default', ['build']);
};
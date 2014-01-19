/*global module,require*/

//TODO add i18n and static page generation for search engines.
//TODO get cdnify working with CDN
//TODO add ngdocs:  https://github.com/m7r/grunt-ngdocs

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
        dist: 'dist',
        tmp: '.tmp',
        test: 'test'
    };

    try {
        subrosaConfig.src = require('./bower.json').appPath || subrosaConfig.src;
    } catch (e) {}

    grunt.initConfig({
        subrosa: subrosaConfig,
        watch: {
            livereload: {
                files: [
                    'lib/**/*',
                    '<%= subrosa.src %>/**/*.html',
                    '<%= subrosa.src %>/css/**/*.css',
                    '<%= subrosa.src %>/app/**/*.js',
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
                                '!^/(css|app|img|photos|lib|views|subrosa).+$ /index.html'
                            ]),
                            proxySnippet,
                            lrSnippet,
                            mountFolder(connect, subrosaConfig.src),
                            mountFolder(connect, subrosaConfig.lib)
                        ];
                    }
                }
            },
            test: {
                options: {
                    middleware: function (connect) {
                        return [
                            mountFolder(connect, subrosaConfig.test)
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
            dist: subrosaConfig.dist,
            tmp: subrosaConfig.tmp
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
                '<%= subrosa.src %>/app/**/*.js',
                '!lib/**/*.js'
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
                    cwd: '<%= subrosa.dist %>/app',
                    src: '*.js',
                    dest: '<%= subrosa.dist %>/app'
                }]
            }
        },
        ngtemplates: {
            subrosa: {
                options:    {
                    base: '<%= subrosa.src %>'       // $templateCache ID will be relative to this directory
                },
                src: [ '<%= subrosa.src %>/app/**/*.html' ],
                dest: '<%= subrosa.tmp %>/templates/app/templates.js'
            }
        },
        // Concatenate the resultant template cache to the scripts file.
        concat: {
            templates: {
                files: {
                    '<%= subrosa.dist %>/app/scripts.js': [
                        '<%= subrosa.dist %>/app/scripts.js',
                        '<%= ngtemplates.subrosa.dest %>'
                    ]
                }
            }
        },
        uglify: {
            build: {
                files: {
                    '<%= subrosa.dist %>/app/scripts.js': [
                        '<%= subrosa.dist %>/app/scripts.js'
                    ]
                }
            }
        },
        copy: {
            assets: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= subrosa.src %>',
                    src: [
                        '*.{ico,txt,png}',
                        'img/**/*.{gif,webp}'
                    ],
                    dest: '<%= subrosa.dist %>'
                }]
            }
        }
    });

    grunt.renameTask('regarde', 'watch');

    grunt.registerTask('server', [
        'clean:tmp',
        'configureProxies',
        'livereload-start',
        'connect:livereload',
        'open',
        'watch'
    ]);

    grunt.registerTask('lint', [
        'csslint',
        'jshint'
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

    grunt.registerTask('check', [
        'lint',
        'test'
    ]);

    grunt.registerTask('build:generate', [
        'useminPrepare',
        'imagemin',
        'cssmin',
        'htmlmin',
//        'cdnify',
        'ngtemplates',
        'concat',
        'concat:templates',
        'usemin',
        'copy:assets',
        'ngmin',
        'uglify'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'lint',
        'test',
        'build:generate',
        'clean:tmp'
    ]);

    grunt.registerTask('default', ['build']);
};
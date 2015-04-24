/*global module,require*/

//TODO add i18n and static page generation for search engines.
//TODO get cdnify working with CDN
//TODO add ngdocs:  https://github.com/m7r/grunt-ngdocs

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

    grunt.initConfig({
        subrosa: subrosaConfig,

        // Dev server
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
                    livereload: true,
                    // Change this to '0.0.0.0' to access the server from outside.
                    hostname: 'localhost',
                    middleware: function (connect) {
                        return [
                            modRewrite([
                                '!^/(css|app|img|photos|lib|subrosa|template).+$ /index.html'
                            ]),
                            proxySnippet,
                            mountFolder(connect, subrosaConfig.src)
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
        watch: {
            all: {
                options: { livereload: true },
                files: [
                    '<%= subrosa.src %>/index.html',
                    '<%= subrosa.src %>/app/**/*.html',
                    '<%= subrosa.src %>/app/**/*.js',
                    '<%= subrosa.src %>/img/**/*.{png,jpg,jpeg,gif,webp}'
                ]
            },
            sass: {
                options: {
                    livereload: true,
                    spawn: false
                },
                files: '<%= subrosa.src %>/styles/{,*/}*.{scss,sass}',
                tasks: ['sass']
            }
        },

        // Linting
        scsslint: {
            allFiles: [
                '<%= subrosa.src %>/styles/**/*.scss'
            ],
            options: {
                config: '.scss-lint.yml',
                reporterOutput: 'test/results/scss-lint-report.xml',
                colorizeOutput: true
            }
        },

        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            src: [
                'Gruntfile.js',
                '<%= subrosa.src %>/app/**/*.js',
                '<%= subrosa.test %>/**/*.js'
            ]
        },

        htmlhint: {
            html: {
                src: ['<%= subrosa.src %>/app/**/*.html'],
                options: {
                    'tagname-lowercase': true,
                    'attr-lowercase': true,
                    'attr-value-doublequotes': true,
                    'tag-pair': true,
                    'tag-self-close': true,
                    'id-unique': true,
                    'src-not-empty': true,
                    'style-disabled': true,
                    'img-alt-require': true,
                    'spec-char-escape': true
                }
            }
        },

        // Preprocessors
        sass: {
            development: {
                options: {
                    style: 'expanded',
                    compass: false
                },
                files: {
                    '<%= subrosa.src %>/css/subrosa.css': '<%= subrosa.src %>/styles/subrosa.scss'
                }
            }
        },

        // Testing
        karma: {
            server: {
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
            singleRunUnit: {
                configFile: 'test/config/karma.conf.js',
                singleRun: true
            },
            singleRunE2E: {
                configFile: 'test/config/karma-e2e.conf.js',
                singleRun: true
            }
        },

        // Build
        clean: {
            dist: subrosaConfig.dist,
            tmp: subrosaConfig.tmp
        },

        imagemin: {
            build: {
                files: [{
                    options: {
                        optimizationLevel: 3
                    },
                    expand: true,
                    cwd: '<%= subrosa.src %>/img',
                    src: ['**/*.{jpg,jpeg,gif,png,webp}'],
                    dest: '<%= subrosa.dist %>/img'
                }]
            }
        },

        ngtemplates: {
            subrosa: {
                cwd: '<%= subrosa.src %>',
                src: [ 'app/**/*.html' ],
                dest: '<%= subrosa.tmp %>/templates/templates.js',
                options: {
                    usemin: 'js/scripts.js',
                    htmlmin: '<%= htmlmin.options %>',
                    prefix: '/'
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
                        '*.{ico,text,png,html}'
                    ],
                    dest: '<%= subrosa.dist %>'
                }]
            },
            fonts: {
                files: [{
                    expand: true,
                    flatten: true,
                    src: [
                        '<%= subrosa.src %>/lib/font-awesome/fonts/*',
                        '<%= subrosa.src %>/lib/bootstrap/fonts/*',
                        '<%= subrosa.src %>/lib/leaflet.locatecontrol/src/font/*'
                    ],
                    dest: '<%= subrosa.dist %>/fonts/'
                }]
            },
            leafletImages: {
                files: [{
                    expand: true,
                    flatten: true,
                    src: [
                        '<%= subrosa.src %>/lib/leaflet-dist/images/*',
                        '<%= subrosa.src %>/lib/leaflet.draw/dist/images/*'
                    ],
                    dest: '<%= subrosa.dist %>/css/images/'
                }]
            }
        },

        ngAnnotate: {
            build: {
                src: '<%= subrosa.tmp %>/concat/js/scripts.js',
                dest: '<%= subrosa.tmp %>/concat/js/scripts.js'
            }
        },

        filerev: {
            options: {
                encoding: 'utf8',
                algorithm: 'md5',
                length: 8
            },
            css: {
                src: '<%= subrosa.dist %>/css/*.css'
            },
            js: {
                src: '<%= subrosa.dist %>/js/*.js'
            },
            img: {
                src: ['<%= subrosa.dist %>/img/**/*.{jpg,jpeg,gif,png,webp}']
            }
        },

        useminPrepare: {
            html: '<%= subrosa.src %>/*.html',
            options: {
                dest: '<%= subrosa.dist %>'
            }
        },

        usemin: {
            css: ['<%= subrosa.dist %>/css/*.css'],
            html: ['<%= subrosa.dist %>/**/*.html'],
            js: ['<%= subrosa.dist %>/js/*.js'],
            options: {
                assetsDirs: ['<%= subrosa.dist %>', '<%= subrosa.dist %>/img'],
                patterns: {
                    js: [
                        [/(img\/.*?\.(?:gif|jpeg|jpg|png|webp|svg))/gm, 'Update the JS to reference revved images']
                    ]
                }
            }
        },

        htmlmin: {
            options: {
                collapseBooleanAttributes:      true,
                collapseWhitespace:             true,
                removeAttributeQuotes:          true,
                removeComments:                 false,
                removeEmptyAttributes:          true,
                removeRedundantAttributes:      true,
                removeScriptTypeAttributes:     true,
                removeStyleLinkTypeAttributes:  true
            },
            build: {
                files: [{
                    expand: true,
                    cwd: '<%= subrosa.dist %>',
                    src: ['*.html'],
                    dest: '<%= subrosa.dist %>'
                }]
            }
        },

        // Environment configurations
        ngconstant: {
            options: {
                space: '  ',
                dest: '<%= subrosa.src %>/app/config/config.module.js',
                wrap: '/* jshint ignore:start */\n\n {%= __ngModule %}\n\n/* jshint ignore:end */',
                name: 'subrosa.config'
            },
            development: {
                constants: {
                    ENV: 'development',
                    API_CONFIG: {
                        BASE_URL: grunt.option('api-url') || 'http://localhost:9000/subrosa',
                        VERSION: grunt.option('api-version') || '1'
                    },
                    FB_CONFIG: {
                        APP_ID: grunt.option('fb-app-id') || '121867348713',
                        GRAPH_VERSION: grunt.option('fb-graph-version') || '2.2'
                    }
                },
                values: {
                    DEBUG: true
                }
            },
            production: {
                constants: {
                    ENV: 'production',
                    API_CONFIG: {
                        BASE_URL: grunt.option('api-url') || 'https://subrosagames.com:8080/subrosa',
                        VERSION: grunt.option('api-version') || '1'
                    },
                    FB_CONFIG: {
                        APP_ID: grunt.option('fb-app-id') || '121867348713',
                        GRAPH_VERSION: grunt.option('fb-graph-version') || '2.2'
                    }
                },
                values: {
                    DEBUG: false
                }
            }
        }

    });

    grunt.registerTask('server', [
        'clean:tmp',
        'ngconstant:development',
        'sass',
        'configureProxies',
        'connect:livereload',
        'open',
        'watch'
    ]);

    grunt.registerTask('lint', [
        'scsslint',
        'jshint',
        'htmlhint'
    ]);

    grunt.registerTask('test', [
        'ngconstant:development',
        'connect:test',
        'karma:singleRunUnit',
        'karma:singleRunE2E'
    ]);

    grunt.registerTask('test:server', [
        'ngconstant:development',
        'connect:test',
        'karma:server'
    ]);

    grunt.registerTask('check', [
        'lint',
        'test'
    ]);

    grunt.registerTask('build', [
        'lint',
        'test',
        'clean:dist',
        'ngconstant:production',
        'useminPrepare',
        'imagemin',
        'ngtemplates',
        'copy:assets',
        'copy:fonts',
        'copy:leafletImages',
        'concat:generated',
        'ngAnnotate',
        'cssmin:generated',
        'uglify:generated',
        'filerev',
        'usemin',
        'htmlmin',
        //'clean:tmp'
    ]);

    grunt.registerTask('default', ['build']);
};

/*global module,require*/
'use strict';

// TODO: add i18n
// TODO: static page generation for search engines.
// TODO: generate docs\

module.exports = function (grunt) {
  var modRewrite = require('connect-modrewrite');

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Automatically load required Grunt tasks
  require('jit-grunt')(grunt, {
    cdnify: 'grunt-google-cdn',
    configureProxies: 'grunt-connect-proxy',
    ngtemplates: 'grunt-angular-templates',
    ngconstant: 'grunt-ng-constant',
    scsslint: 'grunt-scss-lint',
    useminPrepare: 'grunt-usemin'
  });

  // Configurable paths for the application
  var appConfig = {
    src: 'src',
    dist: 'dist'
  };

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    subrosa: appConfig,

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      },
      js: {
        files: ['<%= subrosa.src %>/app/**/*.js'],
        tasks: ['newer:jshint:all'],
        options: {
          livereload: '<%= connect.options.livereload %>'
        }
      },
      jsTest: {
        files: ['test/unit/**/*.js'],
        tasks: ['newer:jshint:test', 'karma']
      },
      compass: {
        files: ['<%= subrosa.src %>/styles/**/*.{scss,sass}'],
        tasks: ['compass:server', 'autoprefixer:server']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= subrosa.src %>/**/*.html',
          '.tmp/styles/**/*.css',
          '<%= subrosa.src %>/images/**/*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost',
        livereload: 35729
      },
      proxies: [
        {
          context: '/subrosa',
          host: '10.10.10.42',
          port: 8081
        }
      ],
      livereload: {
        options: {
          open: true,
          middleware: function (connect) {
            return [
              require('grunt-connect-proxy/lib/utils').proxyRequest,
              modRewrite(['^[^\\.]*$ /index.html [L]']),
              connect.static('.tmp'),
              connect().use(
                '/bower_components',
                connect.static('./bower_components')
              ),
              connect().use(
                '/src/styles',
                connect.static('./src/styles')
              ),
              connect.static(appConfig.src)
            ];
          }
        }
      },
      test: {
        options: {
          port: 9001,
          middleware: function (connect) {
            return [
              connect.static('.tmp'),
              connect.static('test'),
              connect().use(
                '/bower_components',
                connect.static('./bower_components')
              ),
              connect.static(appConfig.src)
            ];
          }
        }
      },
      dist: {
        options: {
          open: true,
          base: '<%= subrosa.dist %>'
        }
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
    },

    // Linting
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: {
        src: [
          'Gruntfile.js',
          '<%= subrosa.src %>/app/**/*.js'
        ]
      },
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/unit/**/*.test.js']
      }
    },

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

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= subrosa.dist %>/{,*/}*',
            '!<%= subrosa.dist %>/.git{,*/}*'
          ]
        }]
      },
      server: '.tmp'
    },

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      server: {
        options: {
          map: true
        },
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      }
    },

    // Automatically inject Bower components into the app
    wiredep: {
      app: {
        src: ['<%= subrosa.src %>/index.html'],
        ignorePath: /\.\.\//,
        options: {
          exclude: ['jquery', 'bootstrap.js']
        }
      },
      test: {
        devDependencies: true,
        src: '<%= karma.unit.configFile %>',
        ignorePath: /\.\.\//,
        options: {
          exclude: ['bootstrap.js']
        },
        fileTypes: {
          js: {
            block: /(([\s\t]*)\/{2}\s*?bower:\s*?(\S*))(\n|\r|.)*?(\/{2}\s*endbower)/gi,
            detect: {
              js: /'(.*\.js)'/gi
            },
            replace: {
              js: '\'{{filePath}}\','
            }
          }
        }
      },
      sass: {
        src: ['<%= subrosa.src %>/styles/**/*.{scss,sass}'],
        ignorePath: /(\.\.\/){1,2}bower_components\//
      }
    },

    // Compiles Sass to CSS and generates necessary files if requested
    compass: {
      options: {
        sassDir: '<%= subrosa.src %>/styles',
        cssDir: '.tmp/styles',
        generatedImagesDir: '.tmp/images/generated',
        imagesDir: '<%= subrosa.src %>/images',
        javascriptsDir: '<%= subrosa.src %>/app',
        fontsDir: '<%= subrosa.src %>/styles/fonts',
        importPath: './bower_components',
        httpImagesPath: '/images',
        httpGeneratedImagesPath: '/images/generated',
        httpFontsPath: '/styles/fonts',
        relativeAssets: false,
        assetCacheBuster: false,
        raw: 'Sass::Script::Number.precision = 10\n'
      },
      dist: {
        options: {
          fontsPath: '<%= subrosa.dist %>/fonts',
          generatedImagesDir: '<%= subrosa.dist %>/images/generated'
        }
      },
      server: {
        options: {
          fontsPath: 'bower_components/font-awesome/fonts/',
          sourcemap: true
        }
      }
    },

    // Renames files for browser caching purposes
    filerev: {
      dist: {
        src: [
          '<%= subrosa.dist %>/scripts/{,*/}*.js',
          '<%= subrosa.dist %>/styles/{,*/}*.css',
          '<%= subrosa.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
          '<%= subrosa.dist %>/styles/fonts/*'
        ]
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: '<%= subrosa.src %>/index.html',
      options: {
        dest: '<%= subrosa.dist %>',
        flow: {
          html: {
            steps: {
              js: ['concat', 'uglifyjs'],
              css: ['cssmin']
            },
            post: {}
          }
        }
      }
    },

    // Performs rewrites based on filerev and the useminPrepare configuration
    usemin: {
      html: ['<%= subrosa.dist %>/{,*/}*.html'],
      css: ['<%= subrosa.dist %>/styles/{,*/}*.css'],
      js: ['<%= subrosa.dist %>/scripts/{,*/}*.js'],
      options: {
        assetsDirs: [
          '<%= subrosa.dist %>',
          '<%= subrosa.dist %>/images',
          '<%= subrosa.dist %>/styles'
        ],
        patterns: {
          js: [[/(images\/[^''""]*\.(png|jpg|jpeg|gif|webp|svg))/g, 'Replacing references to images']]
        }
      }
    },

    cssmin: {
      dist: {
        files: {
          '<%= subrosa.dist %>/styles/main.css': [
            '.tmp/styles/{,*/}*.css'
          ]
        }
      }
    },
    uglify: {
      options: {
        wrap: true
      }
    },
    concat: {
      useStrict: {
        files: {
          '.tmp/concat/scripts/scripts.js': [
            '.tmp/concat/scripts/scripts.js'
          ]
        },
        options: {
          // Replace all 'use strict' statements in the code with a single one at the top
          banner: "'use strict';\n",
          process: function (src) {
            return src.replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1');
          }
        }
      }
    },

    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= subrosa.src %>/images',
          src: '**/*.{png,jpg,jpeg,gif}',
          dest: '<%= subrosa.dist %>/images'
        }]
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= subrosa.src %>/images',
          src: '**/*.svg',
          dest: '<%= subrosa.dist %>/images'
        }]
      }
    },

    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          conservativeCollapse: true,
          collapseBooleanAttributes: true,
          removeCommentsFromCDATA: true
        },
        files: [{
          expand: true,
          cwd: '<%= subrosa.dist %>',
          src: ['*.html'],
          dest: '<%= subrosa.dist %>'
        }]
      }
    },

    ngtemplates: {
      dist: {
        options: {
          module: 'subrosa',
          htmlmin: '<%= htmlmin.dist.options %>',
          prefix: '/',
          usemin: 'scripts/scripts.js'
        },
        cwd: '<%= subrosa.src %>',
        src: 'app/**/*.html',
        dest: '.tmp/templateCache.js'
      }
    },

    // ng-annotate tries to make the code safe for minification automatically
    // by using the Angular long form for dependency injection.
    ngAnnotate: {
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/concat/scripts',
          src: '*.js',
          dest: '.tmp/concat/scripts'
        }]
      }
    },

    // Replace Google CDN references
    cdnify: {
      dist: {
        html: ['<%= subrosa.dist %>/*.html']
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= subrosa.src %>',
          dest: '<%= subrosa.dist %>',
          src: [
            '*.{ico,png,txt}',
            '*.html',
            'images/**/*.{webp}',
            'styles/fonts/**/*.{eot,otf,svg,ttf,woff,woff2}'
          ]
        }, {
          expand: true,
          cwd: '.tmp/images',
          dest: '<%= subrosa.dist %>/images',
          src: ['generated/*']
        }, {
          cwd: '.',
          expand: true,
          flatten: true,
          src: [
            'bower_components/font-awesome/fonts/*.{eot,otf,svg,ttf,woff,woff2}',
            'bower_components/bootstrap/fonts/*.{eot,otf,svg,ttf,woff,woff2}',
            'bower_components/leaflet.locatecontrol/src/font/*.{eot,otf,svg,ttf,woff,woff2}'
          ],
          dest: '<%= subrosa.dist %>/fonts'
        }]
      },
      styles: {
        expand: true,
        cwd: '<%= subrosa.src %>/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      }
    },

    // Run some tasks in parallel to speed up the build process
    concurrent: {
      server: [
        'compass:server'
      ],
      test: [
        'compass'
      ],
      dist: [
        'compass:dist',
        'imagemin',
        'svgmin'
      ]
    },

    // Test settings
    karma: {
      unit: {
        configFile: 'test/karma.conf.js',
        singleRun: true
      }
    }
  });


  grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'ngconstant:development',
      'wiredep',
      'concurrent:server',
      'autoprefixer:server',
      'configureProxies:server',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('server', 'DEPRECATED TASK. Use the "serve" task instead', function (target) {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run(['serve:' + target]);
  });

  grunt.registerTask('lint', [
    'scsslint',
    'jshint',
    'htmlhint'
  ]);

  grunt.registerTask('test', [
    'clean:server',
    'ngconstant:development',
    'wiredep',
    'concurrent:test',
    'autoprefixer',
    'connect:test',
    'karma'
  ]);

  grunt.registerTask('check', [
    'lint',
    'test'
  ]);

  grunt.registerTask('build', [
    'check',
    'clean:dist',
    'ngconstant:production',
    'wiredep',
    'useminPrepare',
    'concurrent:dist',
    'autoprefixer',
    'ngtemplates',
    'concat:generated',
    'ngAnnotate',
    'copy:dist',
    'cdnify',
    'cssmin',
    'concat:useStrict',
    'uglify',
    'filerev',
    'usemin',
    'htmlmin'
  ]);

  grunt.registerTask('default', [
    'newer:jshint',
    'test',
    'build'
  ]);
};

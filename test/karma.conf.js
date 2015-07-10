// Karma configuration
// http://karma-runner.github.io/0.12/config/configuration-file.html
// Generated on 2015-07-07 using
// generator-karma 1.0.0

module.exports = function(config) {
  'use strict';

  config.set({
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // base path, that will be used to resolve files and exclude
    basePath: '../',

    // testing framework to use (jasmine/mocha/qunit/...)
    // as well as any additional frameworks (requirejs/chai/sinon/...)
    frameworks: [
      "jasmine"
    ],

    // list of files / patterns to load in the browser
    files: [
      // bower:js
      'bower_components/es5-shim/es5-shim.js',
      'bower_components/jquery/dist/jquery.js',
      'bower_components/angular/angular.js',
      'bower_components/angular-animate/angular-animate.js',
      'bower_components/angular-aria/angular-aria.js',
      'bower_components/angular-cookies/angular-cookies.js',
      'bower_components/angular-messages/angular-messages.js',
      'bower_components/angular-resource/angular-resource.js',
      'bower_components/angular-route/angular-route.js',
      'bower_components/angular-sanitize/angular-sanitize.js',
      'bower_components/angular-touch/angular-touch.js',
      'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
      'bower_components/leaflet/dist/leaflet.js',
      'bower_components/angular-leaflet-directive/dist/angular-leaflet-directive.js',
      'bower_components/angularjs-geolocation/src/geolocation.js',
      'bower_components/angular-toggle-switch/angular-toggle-switch.js',
      'bower_components/angular-ui-router/release/angular-ui-router.js',
      'bower_components/json3/lib/json3.js',
      'bower_components/leaflet.draw/dist/leaflet.draw.js',
      'bower_components/leaflet.locatecontrol/src/L.Control.Locate.js',
      'bower_components/leaflet.markercluster/dist/leaflet.markercluster-src.js',
      'bower_components/lodash/dist/lodash.compat.js',
      'bower_components/flow.js/dist/flow.js',
      'bower_components/ng-flow/dist/ng-flow.js',
      'bower_components/ng-facebook/ngFacebook.js',
      'bower_components/ng-sortable/dist/ng-sortable.js',
      'bower_components/angular-mocks/angular-mocks.js',
      // endbower

      'test/mock/third-party-mocks.js',
      'test/mock/mocks.module.js',
      'test/mock/*.js',

      "src/app/**/*.module.js",
      "src/app/**/*.js",
      "src/app/**/*.html",
      "test/unit/**/*.test.js"
    ],

    // list of files / patterns to exclude
    exclude: [
    ],

    // web server port
    port: 9999,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: [
      "PhantomJS"
    ],

    // Which plugins to enable
    plugins: [
      "karma-phantomjs-launcher",
      "karma-jasmine",
      'karma-coverage',
      'karma-junit-reporter',
      'karma-ng-html2js-preprocessor'
    ],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,

    colors: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    // Uncomment the following lines if you are using grunt's server to run the tests
    // proxies: {
    //   '/': 'http://localhost:9000/'
    // },
    // URL root prevent conflicts with the site root
    // urlRoot: '_karma_'


    // test results reporter to use
    // possible values: dots || progress || growl
    reporters: ['coverage', 'junit', 'progress'],
    junitReporter: {
      outputFile: 'test/results/test-results.xml'
    },

    coverageReporter: {
      type : 'cobertura',
      dir : 'test/results/coverage'
    },

    preprocessors: {
      'src/app/**/*.js': ['coverage'],
      'src/app/**/*.html': ['ng-html2js']
    },

    ngHtml2JsPreprocessor: {
      stripPrefix: 'src/',
      prependPrefix: '/'
    }
  });
};

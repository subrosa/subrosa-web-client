// Karma configuration
module.exports = function (config) {
    config.set({
        frameworks: ['jasmine'],

        // base path, that will be used to resolve files and exclude
        basePath: '../../src/',

        // list of files / patterns to load in the browser
        files: [
            'lib/jquery/dist/jquery.min.js',
            'lib/lodash/dist/lodash.js',
            'lib/angular/angular.js',
            'lib/angular-bootstrap/ui-bootstrap.js',
            'lib/angular-bootstrap/ui-bootstrap-tpls.js',
            'lib/angular-mocks/angular-mocks.js',
            'lib/angular-messages/angular-messages.js',
            'lib/angular-resource/angular-resource.js',
            'lib/angular-sanitize/angular-sanitize.js',
            'lib/angular-ui-router/release/angular-ui-router.js',

            '../test/unit/mocks/third-party-mocks.js',
            '../test/unit/mocks/mocks.module.js',
            '../test/unit/mocks/*',

            // Must load modules first
            'app/**/*.module.js',
            'app/**/*.js',
            'app/**/*.html',
            '../test/unit/**/*.test.js'
        ],

        // necessary in order to prevent 404 from <img src> in tests
        proxies:  {
            '/img/': 'img/'
        },

        // list of files to exclude
        exclude: [],

        // test results reporter to use
        // possible values: dots || progress || growl
        reporters: ['coverage', 'junit', 'progress'],
        junitReporter: {
            outputFile: '../test/results/test-results.xml'
        },

        coverageReporter: {
            type : 'cobertura',
            dir : 'test/results/coverage'
        },

        // web server port
        port: 9001,

        // cli runner port
        runnerPort: 9101,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,

        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers: ['PhantomJS'],

        // If browser does not capture in given timeout [ms], kill it
        captureTimeout: 5000,

        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: false,

        preprocessors: {
            '**/*.js': 'coverage',
            '**/*.html': 'ng-html2js'
        },

        ngHtml2JsPreprocessor: {
            prependPrefix: '/'
        }
    });
};

// Karma configuration

// base path, that will be used to resolve files and exclude
basePath = '../../src/';

// list of files / patterns to load in the browser
files = [
    JASMINE,
    JASMINE_ADAPTER,
    'components/angular/angular.js',
    'components/angular-resource/angular-resource.js',
    'components/angular-sanitize/angular-sanitize.js',
    'components/angular-bootstrap/ui-bootstrap.js',
    'components/angular-ui-router/release/angular-ui-router.js',
    'components/angular-mocks/angular-mocks.js',
    'js/**/*-module.js',
    'js/**/*.js',
    'js/**/*.html',
    '../test/unit/**/*.js'
];

// list of files to exclude
exclude = [];

// test results reporter to use
// possible values: dots || progress || growl
reporters = ['coverage', 'junit', 'progress'];
junitReporter = {
    outputFile: '../test/results/test-results.xml'
};

coverageReporter = {
    type : 'cobertura',
    dir : '../test/coverage'
};

// web server port
port = 9001;

// cli runner port
runnerPort = 9101;

// enable / disable colors in the output (reporters and logs)
colors = true;

// level of logging
// possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
logLevel = LOG_INFO;

// enable / disable watching file and executing tests whenever any file changes
autoWatch = false;

// Start these browsers, currently available:
// - Chrome
// - ChromeCanary
// - Firefox
// - Opera
// - Safari (only Mac)
// - PhantomJS
// - IE (only Windows)
//browsers = ['Chrome', 'Firefox', 'Safari'];
browsers = ['Chrome'];

// If browser does not capture in given timeout [ms], kill it
captureTimeout = 5000;

// Continuous Integration mode
// if true, it capture browsers, run tests and exit
singleRun = false;

preprocessors = {
    '**/*.js': 'coverage',
    '**/*.html': 'html2js'
};

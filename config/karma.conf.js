// Karma configuration

// base path, that will be used to resolve files and exclude
basePath = '';

// list of files / patterns to load in the browser
files = [
  JASMINE,
  JASMINE_ADAPTER,
  '../app/components/angular/angular.js',
  '../app/components/angular-mocks/angular-mocks.js',
  '../app/js/**/*.js',
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

// Test coverage
preprocessors = {
    '**/app/js/**/*.js': 'coverage'
};

coverageReporter = {
    type : 'cobertura',
    dir : '../test/coverage'
}

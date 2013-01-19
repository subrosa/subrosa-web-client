/*globals angular,$script,document*/

// load all of the dependencies asynchronously.
$script([
    'js/lib/angular/angular.min.js',
    'js/lib/angular/angular-resource.min.js',
    'js/app.js',
    'js/services.js',
    'js/controllers.js',
    'js/filters.js',
    'js/directives.js'
], function () {
    'use strict';
    // when all is done, execute bootstrap angular application
    angular.bootstrap(document, ['subrosa']);
});

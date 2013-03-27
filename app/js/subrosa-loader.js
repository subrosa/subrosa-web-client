/*globals angular,$script,document*/

// load all of the dependencies asynchronously.
$script([
    '/js/lib/angular/angular.js',
    '/js/lib/angular/angular-resource.js',
    '/js/lib/raphael-min.js',
    '/js/services/game-services.js',
    '/js/controllers/game-controllers.js',
    '/js/widgets/spinner.js',
    '/js/app.js'
], function () {
    'use strict';
    // when all is done, execute bootstrap angular application
    angular.bootstrap(document, ['subrosa']);
});

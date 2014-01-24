/**
 * @ngdoc module
 * @name subrosa
 *
 * @desription
 *  Base module that defines the subrosa namespace and includes modules used by the application.
 */
angular.module('subrosa', [
    'security',
    'subrosa.account',
    'subrosa.components',
    'subrosa.game',
    'ui.router'
]);

/**
 * @ngdoc config
 * @name subrosa.config
 *
 * @requires $locationProvider
 *
 * @description
 *  Used for establishing application wide configuration.
 */
angular.module('subrosa').config(function ($locationProvider) {
    // Configure html5 mode, otherwise URLs will be base.com/#/home rather than base.com/home.
    // The hashPrefix and the <meta name="fragment" content="!" /> in the index allows google to crawl correctly.
    $locationProvider.html5Mode(true).hashPrefix('!');
});

/**
 * @ngdoc run
 * @name subrosa.run
 *
 * @requires $rootScope
 * @required $state
 * @requires $stateParams
 *
 * @description
 *  Set common items on the $rootScope such as $state related information.
 */
angular.module('subrosa').run(function ($rootScope, $state, $stateParams) {
    /**
     * Provide a way to set the title on the page
     *
     * @param title
     */
    $rootScope.setTitle = function (title) {
        $rootScope.title = title;
    };

    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
});
/**
 * @ngdoc module
 * @name subrosa
 *
 * @desription
 *  Base module that defines the subrosa namespace and includes modules used by the application.
 */
angular.module('subrosa', [
    'subrosa.account',
    'subrosa.components',
    'subrosa.game',
    'subrosa.security',
    'subrosa.notifications',
    'ui.router',
    'ui.bootstrap.dropdownToggle',
    'ui.bootstrap.tpls'
]);

/**
 * @ngdoc config
 * @name subrosa.config
 *
 * @requires $stateProvider
 * @requires $locationProvider
 *
 * @description
 *  Used for establishing application wide configuration.
 */
angular.module('subrosa').config(function ($stateProvider, $locationProvider) {

    $stateProvider.state('home', {
        url: '/'
    });

    // Configure html5 mode, otherwise URLs will be base.com/#/home rather than base.com/home.
    // The hashPrefix and the <meta name="fragment" content="!" /> in the index allows google to crawl correctly.
    $locationProvider.html5Mode(true).hashPrefix('!');
});

/**
 * @ngdoc run
 * @name subrosa.run
 *
 * @requires $rootScope
 * @requires $state
 * @requires $stateParams
 *
 * @description
 *  Set common items on the $rootScope such as $state related information.
 */
angular.module('subrosa').run(function ($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    $rootScope.stateIncludes = $state.includes;
    $rootScope.transitionTo = $state.transitionTo;
    $rootScope.go = $state.go;

    $rootScope.isState = function (stateName) {
        return $state.is(stateName);
    };

    $rootScope.$on('$stateChangeSuccess',
        function (event, toState, toParams, fromState, fromParams) {
            //Record our from state, so we can transition back there
            if (!fromState.abstract) {
                $rootScope.fromState = fromState;
                $rootScope.fromParams = fromParams;
            }
        }
    );
});
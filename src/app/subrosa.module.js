/**
 * @ngdoc module
 * @name subrosa
 *
 * @description
 *  Base module that defines the subrosa namespace and includes modules used by the application.
 */
angular.module('subrosa', [
    'ngAnimate',
    'subrosa.config',
    'subrosa.account',
    'subrosa.components.flash',
    'subrosa.components.form',
    'subrosa.components.menu',
    'subrosa.game',
    'subrosa.notifications',
    'subrosa.security',
    'ui.router',
    'ui.bootstrap.collapse',
    'ui.bootstrap.dropdownToggle',
    'ui.bootstrap.tpls',
    'ngFacebook'
]);

/**
 * @ngdoc config
 * @name subrosa.config
 *
 * @requires $stateProvider
 * @requires $locationProvider
 * @requires $facebookProvider
 * @requires FB
 *
 * @description
 *  Used for establishing application wide configuration.
 */
angular.module('subrosa').config(function ($stateProvider, $locationProvider, $facebookProvider, FB) {
    $stateProvider.state('home', {
        url: '/'
    });

    // Configure html5 mode, otherwise URLs will be base.com/#/home rather than base.com/home.
    // The hashPrefix and the <meta name="fragment" content="!" /> in the index allows google to crawl correctly.
    $locationProvider.html5Mode(true).hashPrefix('!');

    $facebookProvider.setAppId(FB.APP_ID);
    $facebookProvider.setVersion("v" + FB.GRAPH_VERSION);
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
    $rootScope.go = $state.go;
    $rootScope.href = $state.href;
    $rootScope.$stateParams = $stateParams;
    $rootScope.stateIncludes = $state.includes;
    $rootScope.transitionTo = $state.transitionTo;

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

    // Load the facebook SDK asynchronously
    (function () {
        // If we've already installed the SDK, we're done
        if (document.getElementById('facebook-jssdk')) { return; }
        // Get the first script element, which we'll use to find the parent node
        var firstScriptElement = document.getElementsByTagName('script')[0];
        // Create a new script element and set its id
        var facebookJS = document.createElement('script');
        facebookJS.id = 'facebook-jssdk';
        // Set the new script's source to the source of the Facebook JS SDK
        facebookJS.src = '//connect.facebook.net/en_US/all.js';
        // Insert the Facebook JS SDK into the DOM
        firstScriptElement.parentNode.insertBefore(facebookJS, firstScriptElement);
    }());

});

/**
 * @ngdoc module
 * @name subrosa.auth
 *
 * @description
 *  Module for auth related functionality.
 */
angular.module('subrosa.auth', [
    'subrosa.config',
    'ngResource',
    'ngFacebook'
]);

/**
 * @ngdoc config
 * @name subrosa.auth.config
 *
 * @requires $httpProvider
 * @requires $facebookProvider
 * @requires FB_CONFIG
 *
 * @description
 *  Add authInterceptor to $httpProvider interceptors and configure facebook auth integration.
 */
angular.module('subrosa.auth').config(function ($httpProvider, $facebookProvider, FB_CONFIG) {
    'use strict';

    $httpProvider.interceptors.push('authInterceptor');

    $facebookProvider.setAppId(FB_CONFIG.APP_ID);
    $facebookProvider.setVersion("v" + FB_CONFIG.GRAPH_VERSION);
});

/**
 * @ngdoc run
 * @name subrosa.auth.run
 *
 * @requires $rootScope
 * @requires authService
 *
 * @description
 *  Load the facebook SDK asynchronously and set the current user on the $rootScope.
 */
angular.module('subrosa.auth').run(function ($rootScope, authService) {
    'use strict';

    var firstScriptElement, facebookJS;

    // If we've already installed the SDK, we're done
    if (document.getElementById('facebook-jssdk')) { return; }

    // Get the first script element, which we'll use to find the parent node
    firstScriptElement = document.getElementsByTagName('script')[0];

    // Create a new script element and set its id
    facebookJS = document.createElement('script');
    facebookJS.id = 'facebook-jssdk';

    // Set the new script's source to the source of the Facebook JS SDK
    facebookJS.src = '//connect.facebook.net/en_US/all.js';

    // Insert the Facebook JS SDK into the DOM
    firstScriptElement.parentNode.insertBefore(facebookJS, firstScriptElement);

    // Set the current user on the $rootScope
    if (authService.isAuthenticated()) {
        $rootScope.currentUser = authService.refreshCurrentUser();
    }

    $rootScope.$on('auth-currentUserUpdated', function (event, user) {
        $rootScope.currentUser = user;
    });
});

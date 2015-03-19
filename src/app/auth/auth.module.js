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
 *
 * @description
 *  Add authInterceptor to $httpProvider interceptors and configure facebook auth integration.
 */
angular.module('subrosa.auth').config(function ($httpProvider, $facebookProvider, FB) {
    $httpProvider.interceptors.push('authInterceptor');

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
 *  Load the facebook SDK asynchronously.
 */
angular.module('subrosa.auth').run(function () {
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
});

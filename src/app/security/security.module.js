/**
 * @ngdoc module
 * @name security
 *
 * @desription
 *  Module for security related functionality.
 */
angular.module('security', ['gettext']);

/**
 * @ngdoc config
 * @name security.config
 *
 * @requires $httpProvider
 *
 * @description
 *  Add authInterceptor to $httpProvider interceptors.
 */
angular.module('security').config(function ($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
});

/**
 * @ngdoc run
 * @name security.run
 *
 * @requires AuthService
 *
 * @description
 *  Get the current user on application load if they are authenticated.
 */
angular.module('security').run(function (AuthService) {
    if (AuthService.isAuthenticated()) {
        AuthService.getCurrentUser();
    }
});
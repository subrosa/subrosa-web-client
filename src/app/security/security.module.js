/**
 * @ngdoc module
 * @name subrosa.security
 *
 * @desription
 *  Module for security related functionality.
 */
angular.module('subrosa.security', ['gettext']);

/**
 * @ngdoc config
 * @name subrosa.security.config
 *
 * @requires $httpProvider
 *
 * @description
 *  Add authInterceptor to $httpProvider interceptors.
 */
angular.module('subrosa.security').config(function ($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
});

/**
 * @ngdoc run
 * @name subrosa.security.run
 *
 * @requires AuthService
 *
 * @description
 *  Get the current user on application load if they are authenticated.
 */
angular.module('subrosa.security').run(function (AuthService) {
    if (AuthService.isAuthenticated()) {
        AuthService.getCurrentUser();
    }
});
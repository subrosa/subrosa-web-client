/**
 * @ngdoc module
 * @name subrosa.security
 *
 * @description
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
    $httpProvider.interceptors.push('authInterceptor');
});

/**
 * @ngdoc run
 * @name subrosa.security.run
 *
 * @requires $rootScope
 * @requires AuthService
 *
 * @description
 *  Set some AuthService functionality on the $rootScope.
 */
angular.module('subrosa.security').run(function ($rootScope, AuthService) {
    $rootScope.isAuthenticated = AuthService.isAuthenticated;
    $rootScope.logout = AuthService.logout;
});

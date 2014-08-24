/**
 * @ngdoc module
 * @name subrosa.security
 *
 * @description
 *  Module for security related functionality.
 */
angular.module('subrosa.security', []);

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
 * @requires authService
 *
 * @description
 *  Set some authService functionality on the $rootScope.
 */
angular.module('subrosa.security').run(function ($rootScope, authService) {
    $rootScope.isAuthenticated = authService.isAuthenticated;
    $rootScope.logout = authService.logout;
});

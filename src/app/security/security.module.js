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
/**
 * @ngdoc module
 * @name subrosa.uitl
 *
 * @desription
 *  Utility module.
 */
angular.module('subrosa.util', ['gettext']);

/**
 * @ngdoc config
 * @name subrosa.util.config
 *
 * @requires $httpProvider
 *
 * @description
 *  Add ErrorInterceptor to $httpProvider interceptors.
 */
angular.module('subrosa.util').config(function ($httpProvider) {
    $httpProvider.interceptors.push('ErrorInterceptor');
});
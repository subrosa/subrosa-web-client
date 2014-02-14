/**
 * @ngdoc module
 * @name subrosa.notifications
 *
 * @desription
 *  Notifications module.
 */
angular.module('subrosa.notifications', ['gettext']);

/**
 * @ngdoc config
 * @name subrosa.notifications.config
 *
 * @requires $httpProvider
 *
 * @description
 *  Add ErrorInterceptor to $httpProvider interceptors.
 */
angular.module('subrosa.notifications').config(function ($httpProvider) {
    $httpProvider.interceptors.push('ErrorInterceptor');
});
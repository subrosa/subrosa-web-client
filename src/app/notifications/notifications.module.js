/**
 * @ngdoc module
 * @name subrosa.notifications
 *
 * @description
 *  Notifications module.
 */
angular.module('subrosa.notifications', [
    'i18n',
    'subrosa.config'
]);

/**
 * @ngdoc config
 * @name subrosa.notifications.config
 *
 * @requires $httpProvider
 *
 * @description
 *  Add errorInterceptor to $httpProvider interceptors.
 */
angular.module('subrosa.notifications').config(function ($httpProvider) {
    'use strict';

    $httpProvider.interceptors.push('errorInterceptor');
});

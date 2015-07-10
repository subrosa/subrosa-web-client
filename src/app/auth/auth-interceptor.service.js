/**
 * This file incorporates work covered by the following copyright and
 * permission notice:
 *
 *  HTTP Auth Interceptor Module for AngularJS
 *  Copyright (c) 2012 Witold Szczerba
 *  License: MIT
 *
 *  https://github.com/witoldsz/angular-http-auth/
 */

/**
 * @ngdoc service
 * @name subrosa.auth.authInterceptor
 *
 * @requires $rootScope
 * @requires $q
 * @requires $window
 * @requires API_CONFIG
 * @requires authRetryQueue
 *
 * @description
 *  An $httpProvider interceptor that provides the following functionality:
 *   - Adds the auth token to the Authorization header of the outgoing request
 *   - Checks for 401 on responses, adds the response to the authRetryQueue,
 *     and then broadcasts auth-loginRequired event
 */
angular.module('subrosa.auth').service('authInterceptor', function ($rootScope, $q, $window, API_CONFIG, authRetryQueue) {
    'use strict';

    var ALLOWED_401_URLS = [
        API_CONFIG.URL + '/session',
        API_CONFIG.URL + '/user'
    ];

    this.request = function (config) {
        config.headers = config.headers || {};
        if ($window.sessionStorage.token) {
            config.headers['X-SUBROSA-AUTH'] = $window.sessionStorage.token;
        }
        return config;
    };

    this.responseError = function (rejection) {
        if (rejection.status === 401 && ALLOWED_401_URLS.indexOf(rejection.config.url) === -1) {
            var deferred = $q.defer();
            delete $window.sessionStorage.token;
            authRetryQueue.append(rejection.config, deferred);
            $rootScope.$broadcast('auth-loginRequired', rejection);
            return deferred.promise;
        }
        // otherwise, default behavior
        return $q.reject(rejection);
    };
});

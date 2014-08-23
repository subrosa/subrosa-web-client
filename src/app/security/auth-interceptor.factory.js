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
 * @ngdoc factory
 * @name subrosa.security.authInterceptor
 *
 * @requires $rootScope
 * @requires $q
 * @requires $window
 * @requires authRetryQueue
 *
 * @description
 *  An $httpProvider interceptor that provides the following functionality:
 *   - Adds the security token to the Authorization header of the outgoing request
 *   - Checks for 401 on responses, adds the response to the authRetryQueue,
 *     and then broadcasts auth-loginRequired event
 */
angular.module('subrosa.security').factory('authInterceptor', function ($rootScope, $q, $window, authRetryQueue) {
    return {
        request: function (config) {
            config.headers = config.headers || {};
            if ($window.sessionStorage.token) {
                config.headers['X-SUBROSA-AUTH'] = $window.sessionStorage.token;
            }
            return config;
        },
        responseError: function (rejection) {
            if (rejection.status === 401 && rejection.config.url !== '/subrosa/v1/session') {
                var deferred = $q.defer();
                delete $window.sessionStorage.token;
                authRetryQueue.append(rejection.config, deferred);
                $rootScope.$broadcast('auth-loginRequired', rejection);
                return deferred.promise;
            }
            // otherwise, default behavior
            return $q.reject(rejection);
        }
    };
});

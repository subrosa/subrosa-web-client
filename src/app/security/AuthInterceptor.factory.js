/**
 * @ngdoc factory
 * @name subrosa.security.AuthInterceptor
 *
 * @requires $rootScope
 * @requires $q
 * @requires $window
 * @requires AuthRetryQueue
 *
 * @description
 *  An $httpProvider interceptor that provides the following functionality:
 *   - Adds the security token to the Authorization header of the outgoing request
 *   - Checks for 401 on responses, adds the response to the AuthRetryQueue,
 *     and then broadcasts auth-loginRequired event
 */
angular.module('subrosa.security').factory('AuthInterceptor', function ($rootScope, $q, $window, AuthRetryQueue) {
    return {
        request: function (config) {
            config.headers = config.headers || {};
            if ($window.sessionStorage.token) {
                config.headers['X-SUBROSA-AUTH'] = $window.sessionStorage.token;
            }
            return config;
        },
        response: function (response) {
            return response || $q.when(response);
        },
        responseError: function (rejection) {
            if (rejection.status === 401 && rejection.config.url !== '/subrosa/v1/session') {
                var deferred = $q.defer();
                delete $window.sessionStorage.token;
                AuthRetryQueue.append(rejection.config, deferred);
                $rootScope.$broadcast('auth-loginRequired', rejection);
                return deferred.promise;
            }
            // otherwise, default behavior
            return $q.reject(rejection);
        }
    };
});
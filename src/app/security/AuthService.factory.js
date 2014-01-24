/**
 * @ngdoc factory
 * @name security.AuthService
 *
 * @requires $rootScope
 * @requires $window
 * @requires $http
 * @requires $q
 * @requires AuthRetryQueue
 *
 * @description
 *  Handles Authentication related functionality such as providing the current user and
 *  managing sessions via login and logout commands.
 */
angular.module('security').factory('AuthService', function ($rootScope, $window, $http, $q, AuthRetryQueue) {
    var service = {
        currentUser: null,

        /**
         * Is the user authenticated?
         *
         * @returns boolean whether or not the user is authenticated
         */
        isAuthenticated: function () {
            return $window.sessionStorage.token;
        },

        /**
         * Get the current user.
         *
         * @returns object the current user.
         */
        getCurrentUser: function () {
            var success = function (response) {
                service.currentUser = response.data;
                return service.currentUser;
            };
            var error = function () {
                service.logout();
            };
            return $http.get('/subrosa/v1/user').then(success, error);
        },

        /**
         * Call this function to indicate that authentication was successful and trigger a
         * retry of all deferred requests.
         *
         * @param data an optional argument to pass on to $broadcast which may be useful for
         * example if you need to pass through details of the user that was logged in
         */
        loginConfirmed: function (data, configUpdater) {
            service.currentUser = service.getCurrentUser();
            $window.sessionStorage.token = data.token;
            $rootScope.$broadcast('auth-loginConfirmed', data);
            AuthRetryQueue.retryAll(configUpdater);
        },

        /**
         * Call this function to indicate that authentication should not proceed.
         * All deferred requests will be abandoned or rejected (if reason is provided).
         *
         * @param data an optional argument to pass on to $broadcast.
         * @param reason if provided, the requests are rejected; abandoned otherwise.
         */
        loginCancelled: function (data, reason) {
            AuthRetryQueue.rejectAll(reason);
            $rootScope.$broadcast('auth-loginCancelled', data);
        },

        /**
         * Log the user out by calling the APU and then deleting the sessionStorage token.
         */
        logout: function () {
            $http.post('/subrosa/v1/logout').then(function () {
                service.currentUser = null;
                delete $window.sessionStorage.token;
            });
        },

        /**
         * Modify requests in the AuthRetryQueue by providing a function. to
         *
         * @param func the function to transform with
         */
        transformRequests: function (func) {
            AuthRetryQueue.transform(func);
        }
    };

    return service;
});


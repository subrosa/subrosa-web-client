/**
 * @ngdoc factory
 * @name subrosa.security.AuthService
 *
 * @requires $rootScope
 * @requires $http
 * @requires Session
 * @requires AuthRetryQueue
 *
 * @description
 *  Handles Authentication related functionality such as providing the current user and
 *  managing sessions via login and logout commands.
 */
angular.module('subrosa.security').factory('AuthService', function ($rootScope, $http, Session, AuthRetryQueue) {
    var service = {
        currentUser: null,

        /**
         * Is the user authenticated?
         *
         * @returns boolean whether or not the user is authenticated
         */
        isAuthenticated: function () {
            return Boolean(Session.getToken());
        },

        /**
         * Get the current user.
         *
         * @returns object $http $promise.
         */
        getCurrentUser: function () {
            var success = function (response) {
                service.currentUser = response.data;
                return service.currentUser;
            };
            var error = function () {
                Session.removeToken();
            };
            return $http.get('/subrosa/v1/user').then(success, error);
        },

        /**
         * Log the user in using the subrosa API.
         *
         * @param user the user object to login.
         * @returns object $http $promise.
         */
        login: function (user) {
            return $http.post('/subrosa/v1/session', user)
                .success(function (data) {
                    service.loginConfirmed(data);
                })
                .error(function () {
                    // Ensure the user does not have a session
                    Session.removeToken();
                });
        },

        /**
         * Log the user out by calling the API and deleting the sessionStorage token.
         */
        logout: function () {
            $http.post('/subrosa/v1/logout').then(function () {
                Session.removeToken();
                service.currentUser = null;
            });
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
            Session.setToken(data.token);
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


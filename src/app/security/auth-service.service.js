/**
 * This file incorporates work covered by the following copyright and
 * permission notice:
 *
 *  HTTP Auth Interceptor Module for AngularJS
 *  (c) 2012 Witold Szczerba
 *  License: MIT
 *
 *  https://github.com/witoldsz/angular-http-auth/
 */

/**
 * @ngdoc service
 * @name subrosa.security.authService
 *
 * @requires $rootScope
 * @requires $http
 * @requires User
 * @requires session
 * @requires authRetryQueue
 *
 * @description
 *  Handles Authentication related functionality such as providing the current user and
 *  managing sessions via login and logout commands.
 */
angular.module('subrosa.security').service('authService', function ($rootScope, $http, User, session, authRetryQueue) {
    var service = this;
    this.currentUser = null;

    /**
     * Is the user authenticated?
     *
     * @returns boolean whether or not the user is authenticated
     */
    this.isAuthenticated = function () {
        return Boolean(session.getToken());
    };

    /**
     * Get the current user.
     *
     * @returns object promise
     */
    this.getCurrentUser = function (expansion) {
        var success, error;

        success = function (response) {
            service.currentUser = response.data;
        };

        error = function () {
            session.removeToken();
        };

        return User.get({expansion: expansion}, success, error);
    };

    /**
     * Log the user in using the subrosa API.
     *
     * @param user the user object to login.
     * @returns object $http $promise.
     */
    this.login = function (user) {
        return $http.post('/subrosa/v1/session', user)
            .success(function (data) {
                service.loginConfirmed(data);
            })
            .error(function () {
                // Ensure the user does not have a session
                session.removeToken();
            });
    };

    /**
     * Log the user out by calling the API and deleting the sessionStorage token.
     */
    this.logout = function () {
        $http.post('/subrosa/v1/logout').then(function () {
            session.removeToken();
            service.currentUser = null;
        });
    };

    /**
     * Call this function to indicate that authentication was successful and trigger a
     * retry of all deferred requests.
     *
     * @param data an optional argument to pass on to $broadcast which may be useful for
     * example if you need to pass through details of the user that was logged in
     */
    this.loginConfirmed = function (data, configUpdater) {
        service.currentUser = service.getCurrentUser();
        session.setToken(data.token);
        $rootScope.$broadcast('auth-loginConfirmed', data);
        authRetryQueue.retryAll(configUpdater);
    };

    /**
     * Call this function to indicate that authentication should not proceed.
     * All deferred requests will be abandoned or rejected (if reason is provided).
     *
     * @param data an optional argument to pass on to $broadcast.
     * @param reason if provided, the requests are rejected; abandoned otherwise.
     */
    this.loginCancelled = function (data, reason) {
        authRetryQueue.rejectAll(reason);
        $rootScope.$broadcast('auth-loginCancelled', data);
    };

    /**
     * Modify requests in the authRetryQueue by providing a function. to
     *
     * @param func the function to transform with
     */
    this.transformRequests = function (func) {
        authRetryQueue.transform(func);
    };
});


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
 * @name subrosa.auth.authService
 *
 * @requires $rootScope
 * @requires $log
 * @requires $http
 * @requires User
 * @requires session
 * @requires authRetryQueue
 * @requires $facebook
 * @requires API_CONFIG
 *
 * @description
 *  Handles Authentication related functionality such as providing the current user and
 *  managing sessions via login and logout commands.
 */
angular.module('subrosa.auth').service('authService', function ($rootScope, $log, $http, User, session, authRetryQueue, $facebook, API_CONFIG) {
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
     * @param {function} successFn the function to call on success
     * @param {function} errorFn the function to call on error
     *
     * @returns {object} $resource
     */
    this.getCurrentUser = function (successFn, errorFn) {
        var success, error;

        success = function (response) {
            service.currentUser = response.data;
            if (successFn) {
                successFn(response);
            }
        };

        error = function (response) {
            session.removeToken();
            if (errorFn) {
                errorFn(response);
            }
        };

        return User.get(success, error);
    };

    /**
     * Log the user in using the subrosa API.
     *
     * @param user the user object to login.
     * @returns object $http $promise.
     */
    this.login = function (user) {
        return $http.post(API_CONFIG.URL + '/session', user)
            .success(function (data) {
                service.loginConfirmed(data);
            })
            .error(function () {
                // Ensure the user does not have a session
                session.removeToken();
            });
    };

    this.loginWithFb = function () {
        $facebook.login().then(function (response) {
            $log.debug('fb login attempted', response);
            if (!response.authResponse || response.status !== 'connected') {
                return;
            }
            service.socialLogin({
                provider: 'facebook',
                accessToken: response.authResponse.accessToken
            });
        });
    };

    /**
     * Log the user into the subrosa API via social login.
     *
     * @param sessionRequest session data
     * @returns object $http $promise.
     */
    this.socialLogin = function (sessionRequest) {
        return $http.post(API_CONFIG.URL + '/session/' + sessionRequest.provider, sessionRequest)
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
        $http.delete(API_CONFIG.URL + '/session').then(function () {
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


/**
 * @ngdoc service
 * @name subrosa.auth.session
 *
 * @requires $window
 *
 * @description
 *   Used to store and retrieve values from the session storage.
 */
angular.module('subrosa.auth').service('session', function ($window) {
    'use strict';

    /**
     * Return the current session token.
     *
     * @returns object the session token.
     */
    this.getToken = function () {
        return $window.sessionStorage.token;
    };

    /**
     * Set the provided session token.
     *
     * @param token the token to set.
     */
    this.setToken = function (token) {
        $window.sessionStorage.token = token;
    };

    /**
     * Remove the current session token.
     */
    this.removeToken = function () {
        delete $window.sessionStorage.token;
    };
});


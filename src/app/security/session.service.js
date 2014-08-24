/**
 * @ngdoc service
 * @name subrosa.security.session
 *
 * @requires $window
 *
 * @description
 *
 */
angular.module('subrosa.security').service('session', function ($window) {
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


/**
 * @ngdoc factory
 * @name subrosa.security.session
 *
 * @requires $window
 *
 * @description
 *
 */
angular.module('subrosa.security').factory('session', function ($window) {
    var service = {
        /**
         * Return the current session token.
         *
         * @returns object the session token.
         */
        getToken: function () {
            return $window.sessionStorage.token;
        },

        /**
         * Set the provided session token.
         *
         * @param token the token to set.
         */
        setToken: function (token) {
            $window.sessionStorage.token = token;
        },

        /**
         * Remove the current session token.
         */
        removeToken: function () {
            delete $window.sessionStorage.token;
        }
    };

    return service;
});


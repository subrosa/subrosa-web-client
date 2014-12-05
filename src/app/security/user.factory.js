/**
 * @ngdoc factory
 * @name subrosa.security.User
 *
 * @requires $resource
 *
 * @description
 *  Provides a $resource for user(s).
 */
angular.module('subrosa.security').factory('User', function ($resource) {
    return $resource('/subrosa/v1/user/');
});

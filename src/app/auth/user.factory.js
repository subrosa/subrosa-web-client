/**
 * @ngdoc factory
 * @name subrosa.auth.User
 *
 * @requires $resource
 *
 * @description
 *  Provides a $resource for user(s).
 */
angular.module('subrosa.auth').factory('User', function ($resource) {
    return $resource('/subrosa/v1/user/', {}, {
        update: {method: 'PUT'}
    });
});

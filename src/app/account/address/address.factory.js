/**
 * @ngdoc factory
 * @name subrosa.account.Address
 *
 * @requires $resource
 *
 * @description
 *  Provides a $resource for address(es).
 */
angular.module('subrosa.account').factory('Address', function ($resource) {
    return $resource('/subrosa/v1/user/address/:id', {id: '@id'}, {
        query: {method: 'GET', isArray: false},
        update: {method: 'PUT'}
    });
});

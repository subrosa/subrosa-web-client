/**
 * @ngdoc factory
 * @name subrosa.account.account
 *
 * @requires $resource
 *
 * @description
 *  Provides a $resource for account(s).
 */
angular.module('subrosa.account').factory('account', function ($resource) {
    return $resource('/subrosa/v1/account/:id', {id: '@id'}, {
        update: {method: 'PUT'}
    });
});

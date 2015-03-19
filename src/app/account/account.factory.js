/**
 * @ngdoc factory
 * @name subrosa.account.Account
 *
 * @requires $resource
 * @requires API_CONFIG
 *
 * @description
 *  Provides a $resource for account(s).
 */
angular.module('subrosa.account').factory('Account', function ($resource, API_CONFIG) {
    return $resource(API_CONFIG.URL + '/account/:id', {id: '@id'}, {
        update: {method: 'PUT'}
    });
});

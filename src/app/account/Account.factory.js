/**
 * @ngdoc factory
 * @name subrosa.account.Account
 *
 * @requires $resource
 *
 * @description
 *  Provides a $resource for account(s).
 */
angular.module('subrosa.account').factory('Account', function ($resource) {
    return $resource('/subrosa/v1/account/:accountId', {accountId: '@accountId'});
});
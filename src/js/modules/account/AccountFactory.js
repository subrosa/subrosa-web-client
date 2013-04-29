/*global angular */
'use strict';

angular.module('subrosa.account').factory('Account', function ($resource) {
    return $resource('/subrosa/v1/account/:accountId', {accountId: '@accountId'});
});
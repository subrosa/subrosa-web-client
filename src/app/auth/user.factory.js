/**
 * @ngdoc factory
 * @name subrosa.auth.User
 *
 * @requires $resource
 * @requires API_CONFIG
 *
 * @description
 *  Provides a $resource for user(s).
 */
angular.module('subrosa.auth').factory('User', function ($resource, API_CONFIG) {
    'use strict';

    return $resource(API_CONFIG.URL + '/user/:action', {}, {
        update: {method: 'PUT'},
        games: {method: 'GET', params: {action: 'game'}, isArray: true}
    });
});

/**
 * @ngdoc factory
 * @name subrosa.game.GameType
 *
 * @requires $resource
 * @requires API_CONFIG
 *
 * @description
 *  Provides a $resource for GameType
 */
angular.module('subrosa.game').factory('GameType', function ($resource, API_CONFIG) {
    'use strict';

    return $resource(API_CONFIG.URL + '/game-type/:id', {id: '@id'}, {
        query: {method: 'GET', isArray: false},
        update: {method: 'PUT'}
    });
});

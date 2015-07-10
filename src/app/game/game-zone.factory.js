/**
 * @ngdoc factory
 * @name subrosa.game.GameZone
 *
 * @requires $resource
 * @requires API_CONFIG
 *
 * @description
 *  Provides a $resource for game zone(s).
 */
angular.module('subrosa.game').factory('GameZone', function ($resource, API_CONFIG) {
    'use strict';

    return $resource(API_CONFIG.URL + '/game/:gameUrl/zone/:id', {gameUrl: '@gameUrl', id: '@id'}, {
        update: {method: 'PUT'}
    });
});

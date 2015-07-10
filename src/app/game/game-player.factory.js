/**
 * @ngdoc factory
 * @name subrosa.game.GamePlayer
 *
 * @requires $resource
 * @requires API_CONFIG
 *
 * @description
 *  Provides a $resource for game player(s).
 */
angular.module('subrosa.game').factory('GamePlayer', function ($resource, API_CONFIG) {
    'use strict';

    return $resource(API_CONFIG.URL + '/game/:url/player/:id', {url: '@url', id: '@gamePlayerId'}, {
        query: {method: 'GET', isArray: false}
    });
});

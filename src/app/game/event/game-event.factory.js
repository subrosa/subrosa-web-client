/**
 * @ngdoc factory
 * @name subrosa.game.GameEvent
 *
 * @requires $resource
 * @requires API_CONFIG
 *
 * @description
 *  Provides a $resource for game event(s).
 */
angular.module('subrosa.game').factory('GameEvent', function ($resource, API_CONFIG) {
    return $resource(API_CONFIG.URL + '/game/:gameUrl/event/:id', {gameUrl: '@gameUrl', id: '@id'}, {
        query: {method: 'GET', isArray: false},
        update: {method: 'PUT'}
    });
});

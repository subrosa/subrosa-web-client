/**
 * @ngdoc factory
 * @name subrosa.game.GameEvent
 *
 * @requires $resource
 *
 * @description
 *  Provides a $resource for game event(s).
 */
angular.module('subrosa.game').factory('GameEvent', function ($resource) {
    return $resource('/subrosa/v1/game/:gameUrl/event/:id', {gameUrl: '@gameUrl', id: '@id'}, {
        update: {method: 'PUT'}
    });
});
/**
 * @ngdoc factory
 * @name subrosa.game.gameZone
 *
 * @requires $resource
 *
 * @description
 *  Provides a $resource for game zone(s).
 */
angular.module('subrosa.game').factory('gameZone', function ($resource) {
    return $resource('/subrosa/v1/game/:gameUrl/zone/:id', {gameUrl: '@gameUrl', id: '@id'}, {
        update: {method: 'PUT'}
    });
});

/**
 * @ngdoc factory
 * @name subrosa.game.GamePlayer
 *
 * @requires $resource
 *
 * @description
 *  Provides a $resource for game player(s).
 */
angular.module('subrosa.game').factory('GamePlayer', function ($resource) {
    return $resource('/subrosa/v1/game/:url/player/:id', {url: '@url', id: '@gamePlayerId'}, {
        query: {method: 'GET', isArray: false}
    });
});

/**
 * @ngdoc factory
 * @name subrosa.game.Game
 *
 * @requires $resource
 *
 * @description
 *  Provides a $resource for game(s).
 */
angular.module('subrosa.game').factory('Game', function ($resource) {
    return $resource('/subrosa/v1/game/:url', {url: '@url'}, {
        query: {method: 'GET', isArray: false},
        save: {method: 'PUT'}
    });
});
/**
 * @ngdoc factory
 * @name subrosa.game.GameFeed
 *
 * @requires $resource
 *
 * @description
 *  Provides a $resource for game the game feed.
 */
angular.module('subrosa.game').factory('GameFeed', function ($resource) {
    return $resource('/subrosa/v1/game/:gameUrl/post', {gameUrl: '@gameUrl', offset: 0, limit: 20});
});


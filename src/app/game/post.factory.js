/**
 * @ngdoc factory
 * @name subrosa.game.Post
 *
 * @requires $resource
 *
 * @description
 *  Provides a $resource for game the game feed.
 */
angular.module('subrosa.game').factory('Post', function ($resource) {
    return $resource('/subrosa/v1/game/:gameUrl/post', {gameUrl: '@gameUrl'}, {
        query: {method: 'GET', isArray: false, params: {offset: 0, limit: 20}}
    });
});


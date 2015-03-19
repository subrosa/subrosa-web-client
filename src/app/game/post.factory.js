/**
 * @ngdoc factory
 * @name subrosa.game.Post
 *
 * @requires $resource
 * @requires API_CONFIG
 *
 * @description
 *  Provides a $resource for game the game feed.
 */
angular.module('subrosa.game').factory('Post', function ($resource, API_CONFIG) {
    return $resource(API_CONFIG.URL + '/game/:gameUrl/post', {gameUrl: '@gameUrl'}, {
        query: {method: 'GET', isArray: false, params: {offset: 0, limit: 20}}
    });
});


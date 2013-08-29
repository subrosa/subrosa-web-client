/*global angular */
'use strict';

angular.module('subrosa.game').factory('Game', function($resource, $location, $cacheFactory) {
    var gameUrl = $location.path().split('/')[1];
    var cache = $cacheFactory('game');
    var GameService = $resource('/subrosa/v1/game/:gameUrl', {gameUrl: '@gameUrl'});

    return {
        get: function(callback) {
            var game = cache.get(gameUrl);
            if (!game) {
                game = GameService.get({gameUrl: gameUrl}, callback);
                cache.put(gameUrl, game);
            }
            return game;
        }
    };
});
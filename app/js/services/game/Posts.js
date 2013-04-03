/*global angular */
'use strict';

angular.module('subrosa.game').factory('Posts', function ($resource, $location, $cacheFactory) {
    var cache = $cacheFactory('posts');
    var gameUrl = $location.path().split('/')[1];
    var Posts = $resource('/subrosa-api/v1/game/:gameUrl/post', {gameUrl: '@gameUrl', offset: 0, limit: 20});

    return {
        get: function (params, callback) {
            var posts = cache.get(gameUrl);
            if (!posts) {
                params.gameUrl = gameUrl;
                posts = Posts.get(params, callback);
                cache.put(gameUrl, posts);
            }
            return posts;
        }
    };
});


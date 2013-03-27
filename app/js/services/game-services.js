/*globals angular */
'use strict';

/* Services */

var module = angular.module('subrosa.services.game', ['ngResource']);

module.factory('Game', function ($resource) {
    return $resource('/api/game/:gameUrl', {gameUrl: '@gameUrl'});
});

module.factory('Posts', function ($resource) {
    return $resource('/api/game/:gameUrl/post', {gameUrl: '@gameUrl', offset: 0, limit: 20});
});
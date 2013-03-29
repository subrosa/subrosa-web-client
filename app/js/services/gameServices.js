/*global angular */
'use strict';

/* Services */

var gameServiceModule = angular.module('subrosa.services.game', ['ngResource']);

gameServiceModule.factory('Game', function ($resource) {
    return $resource('/api/game/:gameUrl', {gameUrl: '@gameUrl'});
});

gameServiceModule.factory('Posts', function ($resource) {
    return $resource('/api/game/:gameUrl/post', {gameUrl: '@gameUrl', offset: 0, limit: 20});
});
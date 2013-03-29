/*global angular */
'use strict';

/* Services */

var gameServiceModule = angular.module('subrosa.services.game', ['ngResource']);

// TODO make api version a configuration value
gameServiceModule.factory('Game', function ($resource) {
    return $resource('/subrosa-api/v1/game/:gameUrl', {gameUrl: '@gameUrl'});
});

gameServiceModule.factory('Posts', function ($resource) {
    return $resource('/subrosa-api/v1/game/:gameUrl/post', {gameUrl: '@gameUrl', offset: 0, limit: 20});
});
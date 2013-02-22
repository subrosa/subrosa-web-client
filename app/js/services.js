/*globals angular */
'use strict';

/* Services */
var services = angular.module('subrosa.services', ['ngResource']);

services.factory('Game', ['$resource', function ($resource) {
    return $resource('/api/game/:gameUrl', {gameUrl: '@gameUrl'});
}]);

services.factory('Posts', ['$resource', function ($resource) {
    return $resource('/api/game/:gameUrl/post', {gameUrl: '@gameUrl', offset: 0, limit: 20});
}]);
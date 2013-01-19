/*globals angular */
'use strict';

/* Services */
var services = angular.module('subrosa.services', ['ngResource']);

services.factory('Game', function ($resource) {
    return $resource('/api/game/:gameId', {gameId: '@id'});
});
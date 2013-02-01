/*globals angular */
'use strict';

/* Services */
var subrosaServices = angular.module('subrosa.services', ['ngResource']);

subrosaServices.factory('Game', function ($resource) {
    return $resource('/api/game/:gameId', {gameId: '@id'});
});
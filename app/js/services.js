/*globals angular */
'use strict';

/* Services */
angular.module('subrosa.services', ['ngResource']).
    factory('Game', function ($resource) {
        return $resource('/api/game/:gameId', {}, {
            get: {method: 'GET'}
        });
    });

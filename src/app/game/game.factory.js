/**
 * @ngdoc factory
 * @name subrosa.game.Game
 *
 * @requires $resource
 * @requires API_CONFIG
 *
 * @description
 *  Provides a $resource for game(s).
 */
angular.module('subrosa.game').factory('Game', function ($resource, API_CONFIG) {
    'use strict';

    var game = $resource(API_CONFIG.URL + '/game/:url', {url: '@url'}, {
        query: {method: 'GET', isArray: false},
        update: {method: 'PUT'},
        publish: {method: 'POST', url: API_CONFIG.URL + '/game/:url/publish'},
        queryPoints: {method: 'GET', isArray: false, transformResponse: function (response) {
            var markers = {};
            response = angular.fromJson(response);

            angular.forEach(response.results, function (game) {
                if (game.hasOwnProperty('location')) {
                    var marker = {
                        group: 'games',
                        latitude: game.location.latitude,
                        longitude: game.location.longitude,
                        modelName: 'game',
                        model: game
                    };
                    markers[game.url.replace(/-/g, '')] = marker;
                }
            });

            return markers;
        }}
    });

    // Game statuses
    game.prototype.isDraft = function () {
        return this.status === 'DRAFT';
    };

    game.prototype.isPreregistration = function () {
        return this.status === 'PREREGISTRATION';
    };

    game.prototype.isRegistration = function () {
        return this.status === 'REGISTRATION';
    };

    game.prototype.isPostRegistration = function () {
        return this.status === 'POSTREGISTRATION';
    };

    game.prototype.isRunning = function () {
        return this.status === 'RUNNING';
    };

    game.prototype.isArchived = function () {
        return this.status === 'ARCHIVED';
    };

    return game;
});

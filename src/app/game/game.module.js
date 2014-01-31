/**
 * @ngdoc module
 * @name subrosa.game
 *
 * @description
 *  Module for game related functionality.
 */
angular.module('subrosa.game', [
    'geolocation',
    'gettext',
    'ngResource',
    'ui.router'
]);

/**
 * @ngdoc object
 * @name subrosa.game.config
 *
 * @requires $stateProvider
 *
 * @description
 *  Set up the game state machine.
 */
angular.module('subrosa.game').config(function ($stateProvider) {

    $stateProvider.state('games', {
        url: '/games',
        controller: 'GameListController',
        templateUrl: '/app/game/views/game-list.html'
    });

    $stateProvider.state('game', {
        abstract: true,
        controller: 'GameController',
        templateUrl: '/app/game/views/game-layout.html'
    });

    $stateProvider.state('game.dashboard', {
        url: '/game/{gameUrl}',
        views: {
            "@game": {
                templateUrl: '/app/game/views/game-dashboard.html'
            },
            "left@game.dashboard": {
                controller: 'GameFeedController',
                templateUrl: '/app/game/views/game-feed.html'
            },
            "right@game.dashboard": {
                controller: 'GameStatsController',
                templateUrl: '/app/game/views/game-stats.html'
            }
        }
    });

    $stateProvider.state('game.dashboard.rules', {
        url: '/rules',
        views: {
            'right@game.dashboard': {
                controller: 'GameRulesController',
                templateUrl: '/app/game/views/game-rules.html'
            }
        }
    });
    $stateProvider.state('game.dashboard.stats', {
        views: {
            'right@game.dashboard': {
                controller: 'GameStatsController',
                templateUrl: '/app/game/views/game-stats.html'
            }
        }
    });
});
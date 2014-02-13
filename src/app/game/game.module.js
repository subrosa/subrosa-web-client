/**
 * @ngdoc module
 * @name subrosa.game
 *
 * @description
 *  Module for game related functionality.
 */
angular.module('subrosa.game', [
    'gettext',
    'leaflet-directive',
    'ngResource',
    'ui.router',
    'ui.bootstrap.datepicker',
    'ui.bootstrap.timepicker'
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

    $stateProvider.state('new-game', {
        url: '/new-game',
        controller: 'NewGameController',
        templateUrl: '/app/game/views/new-game.html'
    });

    $stateProvider.state('game', {
        url: '/game/{gameUrl}',

        views: {
            '@': {
                controller: 'GameController',
                templateUrl: '/app/game/views/game-layout.html'
            },
            'header@game': {
                templateUrl: '/app/game/views/game-header.html'
            },
            'menu@game': {
                templateUrl: '/app/game/views/game-menu.html'
            },
            'left@game': {
                controller: 'GameFeedController',
                templateUrl: '/app/game/views/game-feed.html'
            },
            'right@game': {
                controller: 'GameStatsController',
                templateUrl: '/app/game/views/game-stats.html'
            }
        }
    });

    $stateProvider.state('game.rules', {
        url: '/rules',
        views: {
            'right@game': {
                controller: 'GameRulesController',
                templateUrl: '/app/game/views/game-rules.html'
            }
        }
    });

    $stateProvider.state('game.edit', {
        url: '/edit',

        views: {
            'header@game': {
                controller: 'EditGameController',
                templateUrl: '/app/game/edit/views/edit-game-header.html'
            },
            'menu@game': {
                templateUrl: '/app/game/edit/views/edit-game-menu.html'
            },
            'left@game': {
                controller: 'GameFeedController',
                templateUrl: '/app/game/views/game-feed.html'
            },
            'right@game': {
                controller: 'EditGameController',
                templateUrl: '/app/game/edit/views/edit-game-options.html'
            }
        }
    });
    $stateProvider.state('game.edit.rules', {
        url: '/rules',

        views: {
            'right@game': {
                controller: 'GameRulesController',
                templateUrl: '/app/game/views/game-rules.html'
            }
        }
    });
    $stateProvider.state('game.edit.zone', {
        url: '/zone',

        views: {
            'right@game': {
                controller: 'EditGameZoneController',
                templateUrl: '/app/game/edit/views/edit-game-zone.html'
            }
        }
    });
});

/**
 * @ngdoc constant
 * @name subrosa.game.leaflet
 *
 * @description
 *  Set leaflet global L as an angular constant.
 */
/* global window */
angular.module('subrosa.game').constant('leaflet', window.L);
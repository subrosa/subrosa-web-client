/**
 * @ngdoc module
 * @name subrosa.game
 *
 * @description
 *  Module for game related functionality.
 */
angular.module('subrosa.game', [
    'gettext',
    'ngResource',
    'subrosa.components.map',
    'subrosa.components.modal',
    'subrosa.components.timeline',
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
        controller: 'GameController',

        views: {
            '@': {
                controller: 'GameController',
                templateUrl: '/app/game/views/game.html'
            },
            'content@game': {
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
            'content@game': {
                templateUrl: '/app/game/edit/views/edit-game-layout.html',
            },
            'header@game': {
                controller: 'EditGameController',
                templateUrl: '/app/game/edit/views/edit-game-header.html'
            },
            'menu@game.edit': {
                templateUrl: '/app/game/edit/views/edit-game-menu.html'
            },
            'middle@game.edit': {
                controller: 'EditGameController',
                templateUrl: '/app/game/edit/views/edit-game-options.html'
            }
        }
    });
    $stateProvider.state('game.edit.rules', {
        url: '/rules',

        views: {
            'middle@game.edit': {
                controller: 'GameRulesController',
                templateUrl: '/app/game/views/game-rules.html'
            }
        }
    });
    $stateProvider.state('game.edit.zone', {
        url: '/zone',

        views: {
            'middle@game.edit': {
                controller: 'EditGameZoneController',
                templateUrl: '/app/game/edit/views/edit-game-zone.html'
            }
        }
    });
    $stateProvider.state('game.edit.events', {
        url: '/events',

        views: {
            'middle@game.edit': {
                controller: 'EditGameEventsController',
                templateUrl: '/app/game/edit/views/edit-game-events.html'
            },
            'event-view@game.edit.events': {
                templateUrl: '/app/game/edit/views/edit-game-events-scheduled.html'
            }
        }
    });
    $stateProvider.state('game.edit.events.triggered', {
        url: '/events/triggered',

        views: {
            'event-view@game.edit.events': {
                templateUrl: '/app/game/edit/views/edit-game-events-triggered.html'
            }
        }
    });
});
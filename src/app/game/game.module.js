/**
 * @ngdoc module
 * @name subrosa.game
 *
 * @description
 *  Module for game related functionality.
 */
angular.module('subrosa.game', [
    'geolocation',
    'i18n',
    'ngResource',
    'subrosa.components.form',
    'subrosa.components.map',
    'subrosa.components.modal',
    'subrosa.components.timeline',
    'subrosa.player',
    'subrosa.utils',
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
            'header@game': {
                templateUrl: '/app/game/views/game-header.html'
            },
            'content@game': {
                controller: 'GameFeedController',
                templateUrl: '/app/game/views/game-feed.html'
            },
            'menu@game': {
                templateUrl: '/app/game/views/game-menu.html'
            }
        }
    });

    $stateProvider.state('game.rules', {
        url: '/rules',
        views: {
            'content@game': {
                controller: 'GameRulesController',
                templateUrl: '/app/game/views/game-rules.html'
            }
        }
    });

    $stateProvider.state('game.statistics', {
        url: '/statistics',
        views: {
            'content@game': {
                templateUrl: '/app/game/views/game-stats.html'
            }
        }
    });

    $stateProvider.state('game.enroll', {
        url: '/join',
        views: {
            'content@game': {
                controller: 'GameEnrollmentController',
                templateUrl: '/app/game/enroll/views/game-enrollment.html'
            },
            'right@game.enroll': {
                controller: 'GameRulesController',
                templateUrl: '/app/game/views/game-rules.html'
            }
        }
    });
    $stateProvider.state('game.enroll.edit-player', {
        url: '/edit-player',
        templateUrl: '/app/player/views/edit-player.html'
    });
    $stateProvider.state('game.enroll.select-player', {
        url: '/select-player',
        templateUrl: '/app/player/views/select-player.html'
    });
    $stateProvider.state('game.enroll.join-game', {
        templateUrl: '/app/game/enroll/views/join-game-form.html'
    });

    $stateProvider.state('game.edit', {
        url: '/edit',
        views: {
            'header@game': {
                controller: 'EditGameController',
                templateUrl: '/app/game/edit/views/edit-game-header.html'
            },
            'content@game': {
                controller: 'GameRulesController',
                templateUrl: '/app/game/views/game-rules.html'
            },
            'menu@game': {
                templateUrl: '/app/game/edit/views/edit-game-menu.html'
            }
        }
    });

    $stateProvider.state('game.edit.options', {
        url: '/options',
        views: {
            'content@game': {
                controller: 'EditGameOptionsController',
                templateUrl: '/app/game/edit/views/edit-game-options.html'
            }
        }
    });

    $stateProvider.state('game.edit.enrollment', {
        url: '/enrollment',
        views: {
            'content@game': {
                controller: 'EditGameEnrollmentController',
                templateUrl: '/app/game/edit/views/edit-game-enrollment.html'
            }
        }
    });

    $stateProvider.state('game.edit.zone', {
        url: '/zone',

        views: {
            'content@game': {
                controller: 'EditGameZoneController',
                templateUrl: '/app/game/edit/views/edit-game-zone.html'
            }
        }
    });

    $stateProvider.state('game.edit.events', {
        url: '/events',

        views: {
            'content@game': {
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

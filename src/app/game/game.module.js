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
    'subrosa.components.flash',
    'subrosa.components.form',
    'subrosa.components.map',
    'subrosa.components.modal',
    'subrosa.player',
    'subrosa.utils',
    'timer',
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

    $stateProvider.state('create-game', {
        url: '/new-game',
        controller: 'CreateGameController',
        templateUrl: '/app/game/create/views/create-game.html'
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

    $stateProvider.state('game.info', {
        url: '/info',
        views: {
            'content@game': {
                templateUrl: '/app/game/views/game-info.html'
            }
        }
    });

    $stateProvider.state('game.map', {
        url: '/map',
        views: {
            'content@game': {
                templateUrl: '/app/game/views/game-map.html'
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

    $stateProvider.state('game.join', {
        url: '/join',
        views: {
            'content@game': {
                controller: 'JoinGameController',
                templateUrl: '/app/game/join/views/join-game.html'
            }
        }
    });

    $stateProvider.state('game.join.register', {
        url: '/register',
        controller: 'RegisterFormController',
        templateUrl: '/app/account/views/register-form.html'
    });

    $stateProvider.state('game.join.select-player', {
        url: '/select-player',
        controller: 'JoinGameSelectPlayerController',
        templateUrl: '/app/game/join/views/join-game-select-player.html'
    });

    $stateProvider.state('game.join.player-info', {
        url: '/player-info',
        controller: 'JoinGamePlayerInfoController',
        templateUrl: '/app/game/join/views/join-game-player-info.html'
    });

    $stateProvider.state('game.edit', {
        url: '/edit',
        views: {
            'header@game': {
                controller: 'EditGameController',
                templateUrl: '/app/game/edit/views/edit-game-header.html'
            },
            'content@game': {
                templateUrl: '/app/game/edit/views/edit-game.html'
            },
            'menu@game': {
                templateUrl: '/app/game/edit/views/edit-game-menu.html'
            }
        }
    });

    $stateProvider.state('game.edit.rules', {
        url: '/rules',
        views: {
            'content@game': {
                controller: 'EditGameRulesController',
                templateUrl: '/app/game/edit/views/edit-game-rules.html'
            }
        }
    });

    $stateProvider.state('game.edit.enrollment', {
        url: '/join-game-form',
        views: {
            'content@game': {
                controller: 'EditJoinGameFormController',
                templateUrl: '/app/game/edit/views/edit-join-game-form.html'
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

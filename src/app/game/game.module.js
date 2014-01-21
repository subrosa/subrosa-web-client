/**
 * @ngdoc module
 * @name subrosa.game
 *
 * @description
 *  Module for game related functionality.
 */
angular.module('subrosa.game', [
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
        url: '/game/{gameUrl}',
        controller: 'GameController',
        templateUrl: '/app/game/views/game-layout.html'
    });

    $stateProvider.state('game.dashboard', {
        url: '',
        controller: 'GameDashboardController',
        templateUrl: '/app/game/views/game-dashboard.html'
    });

    $stateProvider.state('game.feed', {
        url: '/feed',
        controller: 'GameFeedController',
        templateUrl: '/app/game/views/game-feed.html'
    });

    $stateProvider.state('game.rules', {
        url: '/rules',
        controller: 'GameRulesController',
        templateUrl: '/app/game/views/game-rules.html'
    });
});
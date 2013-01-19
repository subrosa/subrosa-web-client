/*globals angular*/
'use strict';

// Declare app level module which depends on filters, and services
angular.module('subrosa', ['subrosa.filters', 'subrosa.services', 'subrosa.directives'],
    function ($routeProvider, $locationProvider) {
        $routeProvider.when('/game/:gameId', {templateUrl: 'partials/game.html', controller: GameInitController});
        $routeProvider.when('/feed', {templateUrl: 'partials/feed.html', controller: FeedController});
        $routeProvider.when('/rules', {templateUrl: 'partials/rules.html', controller: RulesController});

        // If nothing else matches lookup the game by name.
        $routeProvider.otherwise({redirectTo: '/init'});

        // configure html5 to get links working
        // If you don't do this, you URLs will be base.com/#/home rather than base.com/home
        //$locationProvider.html5Mode(true);
    });

/*globals angular*/
'use strict';

var subrosa = angular.module('subrosa', ['subrosa.directives', 'subrosa.filters', 'subrosa.services']);

// Configure the application routing
subrosa.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider.when('/:gameId', {templateUrl: '/partials/game.html', controller: 'GameInitController'});
    $routeProvider.when('/:gameId/feed', {templateUrl: '/partials/feed.html', controller: 'FeedController'});
    $routeProvider.when('/:gameId/rules', {templateUrl: '/partials/rules.html', controller: 'RulesController'});

    // Configure html5 mode, otherwise URLs will be base.com/#/home rather than base.com/home.
    // The hashPrefix and the <meta name="fragment" content="!" /> in the index allows google to crawl correctly.
    $locationProvider.html5Mode(true).hashPrefix('!');
}]);
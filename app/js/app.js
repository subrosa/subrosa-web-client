/*globals angular*/
'use strict';

// Dependency management
angular.module('subrosa', ['subrosa.game', 'spinner']);
angular.module('subrosa.game', ['subrosa.services.game', 'subrosa.controllers.game']);

// Configure the application routing
angular.module('subrosa').config(function ($routeProvider, $locationProvider) {
    $routeProvider.when('/:gameUrl', {templateUrl: '/views/game/dashboard.html', controller: 'GameInitController'});
    $routeProvider.when('/:gameUrl/feed', {templateUrl: '/views/game/feed.html', controller: 'FeedController'});
    $routeProvider.when('/:gameUrl/rules', {templateUrl: '/views/game/rules.html', controller: 'RulesController'});

    // Configure html5 mode, otherwise URLs will be base.com/#/home rather than base.com/home.
    // The hashPrefix and the <meta name="fragment" content="!" /> in the index allows google to crawl correctly.
    $locationProvider.html5Mode(true).hashPrefix('!');
});
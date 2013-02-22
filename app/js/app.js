/*globals angular*/
'use strict';

var subrosa = angular.module('subrosa', ['subrosa.directives', 'subrosa.filters', 'subrosa.services', 'spinner']);

// Configure the application routing
subrosa.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider.when('/:gameUrl', {templateUrl: '/partials/dashboard.html', controller: 'GameInitController'});
    $routeProvider.when('/:gameUrl/feed', {templateUrl: '/partials/feed.html', controller: 'FeedController'});
    $routeProvider.when('/:gameUrl/rules', {templateUrl: '/partials/rules.html', controller: 'RulesController'});

    // Configure html5 mode, otherwise URLs will be base.com/#/home rather than base.com/home.
    // The hashPrefix and the <meta name="fragment" content="!" /> in the index allows google to crawl correctly.
    $locationProvider.html5Mode(true).hashPrefix('!');
}]);
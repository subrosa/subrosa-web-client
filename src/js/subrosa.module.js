/*global angular*/
'use strict';

// Subrosa Dependencies
var subrosaApp = angular.module('subrosa', [
    'subrosa.account',
    'subrosa.common',
    'subrosa.game',
    'security',
    'widgets.spinner',
    'ui.compat'
]);

subrosaApp.config(function($stateProvider, $locationProvider) {
    // Configure the application routing/state machine.

    $stateProvider.state('sign-in', {
        views: {
            '@': {
                controller: 'SignInFormController',
                templateUrl: 'js/security/sign-in-form.html'
            }
        }
    });

    $stateProvider.state('game', {
        url: '/{gameUrl}',
        abstract: true,
        views: {
            'menu': {
                controller: 'GameInitController',
                templateUrl: 'js/game/views/game-menu.html'
            },
            'sub-header': {
                controller: 'GameInitController',
                templateUrl: 'js/game/views/game-summary.html'
            }
        }
    });

    $stateProvider.state('game.dashboard', {
        url: '',
        views: {
            '@': {
                controller: 'GameDashboardController',
                templateUrl: 'js/game/views/dashboard.html'
            }
        }
    });

    $stateProvider.state('game.feed', {
        url: '/feed',
        views: {
            '@': {
                controller: 'GameFeedController',
                templateUrl: 'js/game/views/feed.html'
            }
        }
    });

    $stateProvider.state('game.rules', {
        url: '/rules',
        views: {
            '@': {
                controller: 'GameRulesController',
                templateUrl: 'js/game/views/rules.html'
            }
        }
    });

    // Configure html5 mode, otherwise URLs will be base.com/#/home rather than base.com/home.
    // The hashPrefix and the <meta name="fragment" content="!" /> in the index allows google to crawl correctly.
    $locationProvider.html5Mode(true).hashPrefix('!');
});

// Set the state and stateParams in the root scope
subrosaApp.run(function($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
});

// Set up common functionality on the root scope
subrosaApp.run(function($rootScope) {
    /*
     * Provide a method to set the title of the page.
     * @param title the text to set.
     */
    $rootScope.setTitle = function(title) {
        $rootScope.title = title;
    };
});
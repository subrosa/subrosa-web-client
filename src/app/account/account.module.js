/**
 * @ngdoc module
 * @name subrosa.account
 *
 * @description
 *  Module for account related functionality.
 */
angular.module('subrosa.account', [
    'ngResource',
    'subrosa.auth',
    'subrosa.components.chooser',
    'subrosa.components.form',
    'subrosa.components.image',
    'subrosa.player',
    'ui.bootstrap.modal',
    'ui.router'
]);

/**
 * @ngdoc object
 * @name subrosa.account.config
 *
 * @requires $stateProvider
 *
 * @description
 *  Set up the account state machine.
 */
angular.module('subrosa.account').config(function ($stateProvider) {
    $stateProvider.state('account', {
        url: '/account',
        views: {
            '@': {
                controller: 'AccountController',
                templateUrl: '/app/account/views/account.html'
            },
            '@account': {
                templateUrl: '/app/account/views/edit-account-information.html'
            }
        }
    });

    $stateProvider.state('account.players', {
        url: '/players',
        controller: 'AccountPlayersController',
        templateUrl: '/app/account/views/edit-account-players.html'
    });

    $stateProvider.state('account.edit-information', {
        url: '/edit',
        templateUrl: '/app/account/views/edit-account-information.html'
    });

    $stateProvider.state('account.edit-security', {
        url: '/edit/security',
        templateUrl: '/app/account/views/edit-account-security.html'
    });

    $stateProvider.state('account-games', {
        url: '/account/games',
        controller: 'AccountGamesController',
        templateUrl: '/app/account/views/account-games.html'
    });

    $stateProvider.state('register', {
        url: '/register',
        templateUrl: '/app/account/views/register.html'
    });

    $stateProvider.state('login', {
        url: '/login',
        controller: 'LoginModalController',
        templateUrl: '/app/account/views/login-form.html'
    });
});

/**
 * @ngdoc run
 * @name subrosa.account.run
 *
 * @requires $rootScope
 *
 * @description
 *  Allow the opening of the login dialog.
 */
angular.module('subrosa.account').run(function ($rootScope) {
    $rootScope.openLoginModal = function (user, options) {
        $rootScope.$broadcast('auth-loginRequired', user, options);
    };
});

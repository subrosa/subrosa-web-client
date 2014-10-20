/**
 * @ngdoc module
 * @name subrosa.account
 *
 * @description
 *  Module for account related functionality.
 */
angular.module('subrosa.account', [
    'ngResource',
    'subrosa.components.form',
    'subrosa.components.image',
    'subrosa.security',
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
            'players@account': {
                templateUrl: '/app/player/views/select-player.html'
            },
            'profile@account': {
                templateUrl: '/app/account/views/account-profile.html'
            }
        }
    });

    $stateProvider.state('account.edit-information', {
        url: '/edit',
        views: {
            'profile@account': {
                templateUrl: '/app/account/edit/views/edit-account-information.html'
            }
        }
    });

    $stateProvider.state('account.edit-security', {
        url: '/edit/security',
        views: {
            'security@account': {
                templateUrl: '/app/account/edit/views/edit-account-security.html'
            }
        }
    });

    $stateProvider.state('account.edit-preferences', {
        url: '/edit/preferences',
        views: {
            'preferences@account': {
                templateUrl: '/app/account/edit/views/account-preferences.html'
            }
        }
    });

    $stateProvider.state('register', {
        url: '/register',
        controller: 'RegisterFormController',
        templateUrl: '/app/account/views/register-form.html'
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
    $rootScope.openLogin = function (user) {
        $rootScope.$broadcast('auth-loginRequired', user);
    };
});

/**
 * @ngdoc module
 * @name subrosa.account
 *
 * @description
 *  Module for account related functionality.
 */
angular.module('subrosa.account', [
    'gettext',
    'ngResource',
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
                templateUrl: '/app/account/views/account-layout.html'
            }
        }
    });

    $stateProvider.state('register', {
        url: '/register',
        controller: 'RegisterFormController',
        templateUrl: '/app/account/views/register-form.html'
    });
});
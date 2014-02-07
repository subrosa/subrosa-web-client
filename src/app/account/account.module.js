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
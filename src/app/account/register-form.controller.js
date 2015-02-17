/**
 * @ngdoc controller
 * @name subrosa.account:RegisterFormController
 *
 * @requires $rootScope
 * @requires $scope
 * @requires $state
 * @requires Account
 * @requires authService
 * @requires i18n
 * @requires flash
 *
 * @description
 *   Provide a controller for the Register Form.
 */
angular.module('subrosa.account').controller('RegisterFormController', function ($rootScope, $scope, $state, Account, authService, i18n, flash) {
    var redirect, success, error;
    $scope.user = {};

    redirect = function () {
        if ($scope.fromState) {
            $state.transitionTo($scope.fromState, $scope.fromParams);
        } else {
            $state.transitionTo('home');
        }
    };

    success = function () {
        authService.login($scope.user);
        redirect();
    };

    error = function (response) {
        var loginSuccess, loginFailure;

        loginSuccess = function () {
            redirect();
            flash.add('success', i18n('You were logged in because you already had an account.'));
        };

        loginFailure = function () {
            $scope.goToLogin({loginViaRegisterFailed: true});
        };

        // If an account already exists
        if (response.status === 409) {
            authService.login($scope.user).then(loginSuccess, loginFailure);

        } else {
            $scope.notifications = response.data.notifications;
        }
    };

    $scope.register = function () {
        var data = {
            account: {email: $scope.user.email},
            password: $scope.user.password
        };
        Account.save(data, success, error);
    };

    $scope.goToLogin = function (options) {
        redirect();
        $scope.openLoginModal($scope.user, options);
    };

    $rootScope.$on('toRegisterFromLogin', function (event, user) {
        $scope.user = user;
    });
});

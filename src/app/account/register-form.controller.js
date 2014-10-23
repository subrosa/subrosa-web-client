/**
 * @ngdoc controller
 * @name subrosa.account:RegisterFormController
 *
 * @requires $rootScope
 * @requires $scope
 * @requires $state
 * @requires Account
 * @requires authService
 *
 * @description
 *   Provide a controller for the Register Form.
 */
angular.module('subrosa.account').controller('RegisterFormController', function ($rootScope, $scope, $state, Account, authService) {
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
        $scope.notifications = response.data.notifications;
    };

    $scope.register = function () {
        var data = {
            account: {email: $scope.user.email},
            password: $scope.user.password
        };
        Account.save(data, success, error);
    };

    $scope.goToLogin = function () {
        redirect();
        $scope.openLoginModal($scope.user);
    };

    $rootScope.$on('toRegisterFromLogin', function (event, user) {
        $scope.user = user;
    });
});

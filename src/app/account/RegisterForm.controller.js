/**
 * @ngdoc controller
 * @name subrosa.account:RegisterFormController
 *
 * @requires $scope
 * @requires $state
 * @requires Account
 * @requires AuthService
 *
 * @description
 *   Provide a controller for the Register Form.
 */
angular.module('subrosa.account').controller('RegisterFormController', function ($scope, $state, Account, AuthService) {
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
        AuthService.login($scope.user);
        redirect();
    };

    error = function (response) {
        $scope.registerError = response.data;
    };

    $scope.register = function () {
        var account = new Account($scope.user);
        account.$save(success, error);
    };

    $scope.goToLogin = function () {
        redirect();
        $scope.openLogin();
    };
});
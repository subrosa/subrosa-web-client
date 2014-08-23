/**
 * @ngdoc controller
 * @name subrosa.account:RegisterFormController
 *
 * @requires $rootScope
 * @requires $scope
 * @requires $state
 * @requires account
 * @requires AuthService
 *
 * @description
 *   Provide a controller for the Register Form.
 */
angular.module('subrosa.account').controller('RegisterFormController', function ($rootScope, $scope, $state, account, AuthService) {
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
        $scope.notifications = response.data.notifications;
    };

    $scope.register = function () {
        var data = {
            account: {email: $scope.user.email},
            password: $scope.user.password
        };
        account.save(data, success, error);
    };

    $scope.goToLogin = function () {
        redirect();
        $scope.openLogin($scope.user);
    };

    $rootScope.$on('toRegisterFromLogin', function (event, user) {
        $scope.user = user;
    });
});

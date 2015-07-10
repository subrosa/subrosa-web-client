/**
 * @ngdoc controller
 * @name subrosa.auth.LoginModalController
 *
 * @requires $rootScope
 * @requires $scope
 * @requires $state
 * @requires $modalInstance
 * @requires authService
 * @requires user (resolved user if provided to modal)
 *
 * @description
 *  Handle submission of the login form.
 */
angular.module('subrosa.auth').controller('LoginModalController',
function ($rootScope, $scope, $state, $modalInstance, authService, user) {
    'use strict';

    var success, error;

    $scope.user = user || {};

    $scope.errors = {
        authError: false,
        unknownError: false
    };

    success = function () {
        $modalInstance.close();
    };

    error = function (data) {
        if (data.status === 401) {
            $scope.errors.authError = true;
        } else {
            $scope.errors.unknownError = true;
        }
    };

    $scope.loginWithFb = authService.loginWithFb;

    $scope.login = function () {
        authService.login($scope.user).then(success, error);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

    $scope.showForgotPassword = function (show) {
        $scope.forgotPassword = show;
    };

    $scope.submitForgotPassword = function () {
        // TODO call an API once it's defined.
    };

    $scope.goToRegister = function () {
        $modalInstance.dismiss('cancel');
        $state.transitionTo('register').then(function () {
            $rootScope.$broadcast('toRegisterFromLogin', $scope.user);
        });
    };
});

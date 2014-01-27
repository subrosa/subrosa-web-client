/**
 * @ngdoc controller
 * @name subrosa.account:RegisterFormController
 *
 * @requires $scope
 * @requires Account
 * @requires AuthService
 *
 * @description
 *   Provide a controller for the Register Form.
 */
angular.module('subrosa.account').controller('RegisterFormController', function ($scope, Account, AuthService) {
    $scope.user = {};

    $scope.register = function () {
        var account = new Account($scope.user);
        account.$save(function () {
            AuthService.login($scope.user);
        });
    };
});
/**
 * @ngdoc controller
 * @name subrosa.account.AccountController
 *
 * @requires $scope
 * @requires authService
 *
 * @description
 *  Parent controller for account related functionality.
 */
angular.module('subrosa.account').controller('AccountController', function ($scope, authService) {
    $scope.saveAccount = function () {
        var success, error;

        success = function () {
            $scope.saving = false;
        };

        error = function (response) {
            $scope.saving = false;
            $scope.notifications = response.data.notifications;
        };

        $scope.account.$update(success, error);
    };

    $scope.setPlayer = function (player) {
        $scope.account.currentPlayer = player;
        $scope.saveAccount();
    };

    $scope.account = authService.getCurrentUser('player');
});

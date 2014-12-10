/**
 * @ngdoc controller
 * @name subrosa.account.AccountController
 *
 * @requires $scope
 * @requires authService
 * @requires Player
 *
 * @description
 *  Parent controller for account related functionality.
 */
angular.module('subrosa.account').controller('AccountController', function ($scope, authService, Player) {
    $scope.updateAccount = function () {
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
        $scope.account.currentPlayerId = player.id;
        $scope.updateAccount();
    };

    $scope.account = authService.getCurrentUser(function () {
        Player.query(function (response) {
            $scope.players = response.results;
        });
    });
});

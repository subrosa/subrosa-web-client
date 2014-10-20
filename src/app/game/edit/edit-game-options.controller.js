/**
 * @ngdoc controller
 * @name subrosa.game.EditGameOptionsController
 *
 * @requires $scope
 *
 * @description
 *  Handles the editing of game options.
 */
angular.module('subrosa.game').controller('EditGameOptionsController', function ($scope) {
    $scope.adding = false;
    $scope.saving = false;

    $scope.saveGame = function () {
        var success, error;

        success = function () {
            $scope.saving = false;
        };

        error = function (response) {
            $scope.saving = false;
            $scope.gameOptionNotifications = response.data.notifications;
        };

        $scope.saving = true;
        $scope.game.$update(success, error);
    };
});

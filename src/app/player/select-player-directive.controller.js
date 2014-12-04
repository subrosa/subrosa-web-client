/**
 * @ngdoc controller
 * @name subrosa.player:SelectPlayerDirectiveController
 *
 * @requires $scope
 * @requires Player
 *
 * @description
 *  The controller for the select player directive.
 */
angular.module('subrosa.player').controller('SelectPlayerDirectiveController', function ($scope, Player) {
    $scope.edit = false;

    $scope.newPlayer = function () {
        $scope.editAvatar = true;
        $scope.editPlayer(new Player());
    };

    $scope.editPlayer = function (player) {
        $scope.player = player;
        $scope.edit = true;
    };

    $scope.cancelEditPlayer = function () {
        $scope.player = null;
        $scope.edit = false;
    };

    $scope.setPlayerImage = function (file) {
        $scope.player.imageId = file.id;
    };

    $scope.savePlayer = function (player) {
        var success, error;

        success = function () {
            $scope.saving = false;
            $scope.setPlayer(player);
        };

        error = function (response) {
            $scope.saving = false;
            $scope.editPlayerNotifications = response.data.notifications;
        };

        $scope.saving = true;
        player.$save(success, error);
    };

    $scope.setPlayer = function (player) {
        $scope.player = player;
        $scope.setPlayerCallback({player: player});
    };
});

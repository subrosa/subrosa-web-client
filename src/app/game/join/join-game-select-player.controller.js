/**
 * @ngdoc controller
 * @name subrosa.game.JoinGameSelectPlayerController
 *
 * @requires $scope
 * @requires $state
 * @requires Player
 *
 * @description
 *  Controller for selecting a player to play a game with.
 */
angular.module('subrosa.game').controller('JoinGameSelectPlayerController', function ($scope, $state, Player) {
    $scope.player = {};

    $scope.selectPlayerNotifications = [];

    $scope.createPlayer = function () {
        var success, error;

        success = function () {
            $scope.selectPlayer($scope.player);
        };

        error = function (response) {
            $scope.selectPlayerNotifications = response.data.notifications;
        };

        return Player.save($scope.player, success, error);
    };

    $scope.setPlayerImage = function (file) {
        $scope.player.imageId = file.id;
    };

    $scope.selectPlayer = function (player) {
        $scope.$parent.player = player;
        $state.go('game.join.player-info');
    };
});

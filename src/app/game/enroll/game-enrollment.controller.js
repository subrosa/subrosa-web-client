/**
 * @ngdoc controller
 * @name subrosa.game.GameEnrollmentController
 *
 * @requires $scope
 * @requires $state
 * @requires authService
 * @requires Account
 * @requires GamePlayer
 *
 * @description
 *  Controller for enrolling users into a game.
 */
angular.module('subrosa.game').controller('GameEnrollmentController',
function ($scope, $state, authService, Account, GamePlayer) {
    $scope.setPlayer = function (player) {
        $scope.player = player;
        $state.go('game.enroll.join');
    };

    $scope.joinGame = function () {
        var success, error;

        success = function () {
            $scope.joining = false;
            $state.go('game');
        };

        error = function (response) {
            $scope.joining = false;
            $scope.joinGameNotifications = response.data.notifications;
        };

        $scope.joining = true;
        GamePlayer.save({url: $scope.game.url}, $scope.player, success, error);
    };

    $scope.account = authService.getCurrentUser('player');
});

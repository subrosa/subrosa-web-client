/**
 * @ngdoc controller
 * @name subrosa.game.GameEnrollmentController
 *
 * @requires $scope
 * @requires $state
 * @requires authService
 * @requires Account
 * @requires Player
 *
 * @description
 *  Controller for enrolling users into a game.
 */
angular.module('subrosa.game').controller('GameEnrollmentController',
function ($scope, $state, authService, Account, Player, GamePlayer) {
    $scope.newPlayer = function () {
        $scope.editPlayer(new Player());
    };

    $scope.editPlayer = function (player) {
        $scope.player = player;
        $state.go('game.enroll.edit-player');
    };

    $scope.cancelEditPlayer = function () {
        $scope.player = null;
        $state.go('game.enroll.select-player');
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
        $state.go('game.enroll.join-game');
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

    authService.getCurrentUser().then(function (user) {
        $scope.account = Account.get({id: user.id, expansion: 'player'}, function (account) {
            if (!account.hasOwnProperty('players') || account.players.length === 0) {
                $scope.newPlayer();
            } else {
                $state.go('game.enroll.select-player');
            }
        });
    });
});

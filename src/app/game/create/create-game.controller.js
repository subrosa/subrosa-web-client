/**
 * @ngdoc controller
 * @name subrosa.game.CreateGameController
 *
 * @requires $scope
 * @requires Game
 *
 * @description
 *  Controller for creating a new game.
 */
angular.module('subrosa.game').controller('CreateGameController', function ($scope, Game) {
    $scope.createGameNotifications = [];
    $scope.game = new Game();

    $scope.setGameType = function (type) {
        $scope.game.gameType = type;
    };

    $scope.createGame = function () {
        var success, error;

        success = function (game) {
            $scope.go('game.edit', {gameUrl: game.url});
        };

        error = function (response) {
            $scope.createGameNotifications = response.data.notifications;
        };

        $scope.game.$save(success, error);
    };
});

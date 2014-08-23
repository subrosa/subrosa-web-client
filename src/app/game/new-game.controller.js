/**
 * @ngdoc controller
 * @name subrosa.game.NewGameController
 *
 * @requires $scope
 * @requires game
 *
 * @description
 *  Controller for creating a new game.
 */
angular.module('subrosa.game').controller('NewGameController', function ($scope, game) {
    var success, error;

    success = function (game) {
        $scope.transitionTo('game.edit', {gameUrl: game.url});
    };

    error = function (response) {
        $scope.notifications = response.data.notifications;
    };

    $scope.game = new game();

    // Hardcoded to ASSASSIN for now because that's all we have
    $scope.game.gameType = 'ASSASSIN';

    $scope.createGame = function () {
        $scope.game.$save(success, error);
    };
});

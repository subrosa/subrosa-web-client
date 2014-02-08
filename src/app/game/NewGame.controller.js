/**
 * @ngdoc controller
 * @name subrosa.game.NewGameController
 *
 * @requires $scope
 * @requires Game
 *
 * @description
 *  Controller for creating a new game.
 */
angular.module('subrosa.game').controller('NewGameController', function ($scope, Game) {
    var success, error;

    success = function (response) {
        $scope.transitionTo('game.edit', {gameUrl: response.data.url});
    };

    error = function (response) {
        $scope.notifications = response.data.notifications;
    };

    $scope.game = new Game();

    $scope.createGame = function () {
        $scope.game.$save(success, error);
    };
});
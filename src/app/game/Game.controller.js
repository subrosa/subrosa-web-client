/**
 * @ngdoc controller
 * @name subrosa.game.GameController
 *
 * @requires $scope
 * @requires Game
 *
 * @description
 *  Parent controller for game related functionality.
 *  Loads the game and sets up common game related functionality.
 */
angular.module('subrosa.game').controller('GameController', function ($scope, Game) {
    $scope.game = Game.get({gameUrl: $scope.$stateParams.gameUrl}, function (game) {
        $scope.setTitle(game.name);
    });
});
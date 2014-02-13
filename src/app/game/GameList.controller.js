/**
 * @ngdoc controller
 * @name subrosa.game.GameListController
 *
 * @requires $scope
 * @requires Game
 *
 * @description
 *  Display the list of games.
 */
angular.module('subrosa.game').controller('GameListController', function ($scope, Game) {
    $scope.games = Game.query();
});
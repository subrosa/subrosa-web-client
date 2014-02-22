/**
 * @ngdoc controller
 * @name subrosa.game.GameRulesController
 *
 * @requires $scope
 * @requires GameZone
 *
 * @description
 *  Controller for game rules related functionality.
 */
angular.module('subrosa.game').controller('GameRulesController', function ($scope, GameZone) {
    $scope.gameZones = GameZone.query({gameUrl: $scope.$stateParams.gameUrl});
});
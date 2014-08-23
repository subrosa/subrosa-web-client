/**
 * @ngdoc controller
 * @name subrosa.game.GameRulesController
 *
 * @requires $scope
 * @requires gameZone
 *
 * @description
 *  Controller for game rules related functionality.
 */
angular.module('subrosa.game').controller('GameRulesController', function ($scope, gameZone) {
    $scope.gameZones = gameZone.query({gameUrl: $scope.$stateParams.gameUrl});
});

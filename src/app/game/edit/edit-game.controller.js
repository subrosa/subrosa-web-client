/**
 * @ngdoc controller
 * @name subrosa.game.EditGameController
 *
 * @requires $scope
 * @requires $state
 * @requires $location
 * @requires $anchorScroll
 *
 * @description
 *  Handles the editing of games.
 */
angular.module('subrosa.game').controller('EditGameController', function ($scope, $state, $location, $anchorScroll) {
    var success, error;

    $scope.saving = false;

    success = function () {
        $scope.saving = false;
    };

    error = function (response) {
        $scope.saving = false;
        $scope.notifications = response.data.notifications;
    };

    $scope.saveGame = function () {
        $scope.saving = true;

        // TODO remove this once the game is not limited to free assassins
        $scope.game.price = 0;
        $scope.game.gameType = 'ASSASSIN';
        $scope.game.$update(success, error);
    };

    $scope.goToGameEvents = function () {
        $state.go('game.edit.events').then(function () {
            $location.hash('editGameEvents');
            $anchorScroll();
        });
    };

});

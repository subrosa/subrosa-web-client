/**
 * @ngdoc controller
 * @name subrosa.game.EditGameOptionsController
 *
 * @requires $scope
 *
 * @description
 *  Handles the editing of games.
 */
angular.module('subrosa.game').controller('EditGameOptionsController', function ($scope) {
    var saveGameSuccess, saveGameError, saving = false;

    saveGameSuccess = function () {
        saving = false;
    };

    saveGameError = function (response) {
        saving = false;
        $scope.notifications = response.data.notifications;
    };

    $scope.saveGame = function () {
        saving = true;
        $scope.game.$save(saveGameSuccess, saveGameError);
    };
});
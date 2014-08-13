/**
 * @ngdoc controller
 * @name subrosa.game.EditGameController
 *
 * @requires $scope
 *
 * @description
 *  Handles the editing of games.
 */
angular.module('subrosa.game').controller('EditGameController', function ($scope) {
    var success, error;

    $scope.saving = false;
    $scope.today = new Date();

    // TODO this should be $locale dependent
    $scope.dateFormat = 'MMMM dd yyyy';

    success = function () {
        $scope.saving = false;
    };

    error = function (response) {
        $scope.saving = false;
        $scope.notifications = response.data.notifications;
    };

    $scope.saveGame = function () {
        $scope.saving = true;
        $scope.game.$update(success, error);
    };
});
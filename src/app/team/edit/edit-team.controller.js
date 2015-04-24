/**
 * @ngdoc controller
 * @name subrosa.team.EditTeamController
 *
 * @requires $scope
 *
 * @description
 *  Handles the editing of a Team.
 */
angular.module('subrosa.team').controller('EditTeamController', function ($scope) {
    var success, error;

    $scope.saving = false;

    success = function () {
        $scope.saving = false;
    };

    error = function (response) {
        $scope.saving = false;
        $scope.notifications = response.data.notifications;
    };

    $scope.saveTeam = function () {
        $scope.saving = true;
        $scope.team.$update(success, error);
    };
});

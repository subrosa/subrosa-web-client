/**
 * @ngdoc controller
 * @name subrosa.team.CreateTeamController
 *
 * @requires $scope
 * @requires Team
 *
 * @description
 *  Controller for creating a new Team.
 */
angular.module('subrosa.team').controller('CreateTeamController', function ($scope, Team) {
    $scope.createTeamNotifications = [];
    $scope.team = new Team();

    $scope.createTeam = function () {
        var success, error;

        success = function (team) {
            $scope.go('game.team.edit', {teamName: team.name});
        };

        error = function (response) {
            $scope.createTeamNotifications = response.data.notifications;
        };

        $scope.team.$save(success, error);
    };
});

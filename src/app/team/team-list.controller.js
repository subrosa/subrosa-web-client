/**
 * @ngdoc controller
 * @name subrosa.team.TeamListController
 *
 * @requires $scope
 * @requires $stateParams
 * @requires Team
 *
 * @description
 *  Display the list of teams.
 */
angular.module('subrosa.team').controller('TeamListController', function ($scope, $stateParams, Team) {
    console.log($stateParams);
    $scope.teams = Team.query({url: $stateParams.gameUrl});
});

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
    $scope.playerLimit = 3;

    Team.query({url: $stateParams.gameUrl}, function (response) {
        $scope.teams = response.results;
    });

    //TODO: remove me
    $scope.teams = [
        {
            id: 1,
            name: "walden's team",
            image: {id: 3, name: 'walden.jpg', url: 'https://avatars1.githubusercontent.com/u/4010736?v=3&s=200'},
            requiresPassword: true,
            players: [
                {id: 1, name: 'walden', image: {url: 'https://avatars1.githubusercontent.com/u/4116405?v=3&s=64'}},
                {id: 6, name: 'brian', image: {url: 'https://avatars2.githubusercontent.com/u/180319?v=3&s=64'}},
                {id: 7, name: 'DK', image: {url: 'https://avatars0.githubusercontent.com/u/294339?v=3&s=64'}},
                {id: 8, name: 'partha', image: {url: 'https://avatars2.githubusercontent.com/u/1069779?v=3&s=64'}},
                {id: 9, name: 'david', image: {url: 'https://avatars0.githubusercontent.com/u/86290?v=3&s=64'}},
                {id: 10, name: 'katello', image: {url: 'https://avatars1.githubusercontent.com/u/1316386?v=3&s=64'}},
                {id: 11, name: 'catello', image: {url: 'https://avatars1.githubusercontent.com/u/2439185?v=3&s=64'}},
                {id: 12, name: 'terrifying pony', image: {url: 'https://avatars3.githubusercontent.com/u/1434927?v=3&s=64'}}

            ]
        },
        {
            id: 1,
            name: "scott's team",
            image: {id: 3, name: 'scott.jpg', image: null},
            players: [
                {id: 1, name: 'scott', image: {url: 'https://avatars3.githubusercontent.com/u/465020?v=3&s=64'}}
            ]
        }
    ];
});

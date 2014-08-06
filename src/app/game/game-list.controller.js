/**
 * @ngdoc controller
 * @name subrosa.game.GameListController
 *
 * @requires $scope
 * @requires geolocation
 * @requires Game
 *
 * @description
 *  Display the list of games.
 */
angular.module('subrosa.game').controller('GameListController', function ($scope, geolocation, Game) {
    $scope.games = Game.query({limit: 0});

    $scope.getCloseGames = function () {
        geolocation.getLocation().then(function (data) {
            $scope.games = Game.query({
                limit: 0,
                latitude: data.coords.latitude,
                longitude: data.coords.longitude
            });
        });
    };
});
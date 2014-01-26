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
    $scope.games = Game.query();

    geolocation.getLocation().then(function (data) {
        $scope.coords = {lat: data.coords.latitude, long: data.coords.longitude};
    });
});
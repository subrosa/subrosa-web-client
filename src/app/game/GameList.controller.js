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
    var success, error;
    $scope.games = Game.query();

    success = function (data) {
        $scope.coords = {lat: data.coords.latitude, long: data.coords.longitude};
    };

    error = function (data) {
        // User rejected access to geolocation
        // TODO: display some help about how they can allow it and why they should
        $scope.coords = data;
    };

    geolocation.getLocation().then(success, error);
});
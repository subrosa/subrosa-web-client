/**
 * @ngdoc controller
 * @name subrosa.game.GameListMapController
 *
 * @requires $scope
 * @requires $q
 *
 * @description
 *  Display the list of games on a map.
 */
angular.module('subrosa.game').controller('GameListMapController', function ($scope, $q) {
    var deferred = $q.defer();
    $scope.markers = deferred.promise;
    $scope.notifications = [];

    $scope.onLocationError = function () {
        $scope.rejectedGeolocation = true;
    };

    $scope.games.$promise.then(function () {
        var markers = {};
        angular.forEach($scope.games.results, function (game) {
            if (game.hasOwnProperty('location')) {
                var marker = {
                    group: 'games',
                    latitude: game.location.latitude,
                    longitude: game.location.longitude,
                    modelName: 'game',
                    model: game
                };
                markers[game.url.replace(/-/g, '')] = marker;
            }
        });

        deferred.resolve(markers);
    });
});
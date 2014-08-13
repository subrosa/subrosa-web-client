/**
 * @ngdoc controller
 * @name subrosa.game.GameListController
 *
 * @requires $scope
 * @requires geolocation
 * @requires geocoder
 * @requires gettext
 * @requires Game
 *
 * @description
 *  Display the list of games.
 */
angular.module('subrosa.game').controller('GameListController', function ($scope, geolocation, geocoder, gettext, Game) {
    $scope.games = Game.query({limit: 0});
    // TODO: make it so an object isn't required
    $scope.postalCode = {};
    $scope.notifications = [];

    $scope.getCloseGames = function () {
        var locationAllowed, locationDenied;

        locationAllowed = function (data) {
            $scope.games = Game.query({
                limit: 0,
                latitude: data.coords.latitude,
                longitude: data.coords.longitude
            });
        };

        locationDenied = function () {
            $scope.locationDenied = true;
        };

        geolocation.getLocation().then(locationAllowed, locationDenied);
    };

    $scope.getCloseGamesViaPostalCode = function (postalCode) {
        var found, notFound;

        found = function (results) {
            var latitude = results[0].geometry.location.lat(),
                longitude = results[0].geometry.location.lng();

            $scope.games = Game.query({
                limit: 0,
                latitude: latitude,
                longitude: longitude
            });
        };

        notFound = function () {
            var notification = {type: 'error', message: gettext('Cannot find postal code: ' + postalCode)};
            $scope.notifications.push(notification);
        };

        geocoder.geocode({address: postalCode}).then(found, notFound);
    };
});
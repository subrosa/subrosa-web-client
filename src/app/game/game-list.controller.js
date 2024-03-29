/**
 * @ngdoc controller
 * @name subrosa.game.GameListController
 *
 * @requires $scope
 * @requires geolocation
 * @requires geocoder
 * @requires i18n
 * @requires Game
 *
 * @description
 *  Display the list of games.
 */
angular.module('subrosa.game').controller('GameListController', function ($scope, geolocation, geocoder, i18n, Game) {
    'use strict';

    $scope.postalCode = {};
    $scope.notifications = [];

    $scope.games = Game.query({limit: 0});
    $scope.gameMarkers = Game.queryPoints({limit: 0});

    $scope.onLocationError = function () {
        $scope.rejectedGeolocation = true;
    };

    $scope.sortByDistance = function () {
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

    $scope.sortByPostalCode = function (postalCode) {
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
            var notification = {type: 'error', message: i18n('Cannot find postal code: ' + postalCode)};
            $scope.notifications.push(notification);
        };

        geocoder.geocode({address: postalCode}).then(found, notFound);
    };
});

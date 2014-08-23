/**
 * @ngdoc controller
 * @name subrosa.game.EditGameZoneController
 *
 * @requires $scope
 * @requires gameZone
 *
 * @description
 *  Handles the editing of game zones.
 */
angular.module('subrosa.game').controller('EditGameZoneController', function ($scope, gameZone) {
    var getLayerData, success, error;

    getLayerData = function (layer) {
        return {points: layer._latlngs};
    };

    success = function (response) {
        // TODO save the zone id to the layer
        $scope.response = response;
    };

    error = function (response) {
        $scope.notifications = response.data.notifications;
    };

    // Add the existing game zone(s) layer
    $scope.gameZones = gameZone.query({gameUrl: $scope.$stateParams.gameUrl});

    $scope.onLocationError = function () {
        $scope.rejectedGeolocation = true;
    };

    $scope.onZoneCreated = function (event) {
        gameZone.save({gameUrl: $scope.$stateParams.gameUrl}, getLayerData(event.layer), success, error);
    };

    $scope.onZoneEdited = function (event) {
        angular.forEach(event.layers.getLayers(), function (layer) {
            gameZone.update({id: layer.id, gameUrl: $scope.$stateParams.gameUrl},
                getLayerData(layer), success, error);
        });
    };

    $scope.onZoneDeleted = function (event) {
        angular.forEach(event.layers.getLayers(), function (layer) {
            gameZone.remove({id: layer.id, gameUrl: $scope.$stateParams.gameUrl}, success, error);
        });
    };
});


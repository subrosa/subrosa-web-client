/**
 * @ngdoc controller
 * @name subrosa.game.EditGameZoneController
 *
 * @requires $scope
 * @requires GameZone
 *
 * @description
 *  Handles the editing of game zones.
 */
angular.module('subrosa.game').controller('EditGameZoneController', function ($scope, GameZone) {
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
    $scope.gameZones = GameZone.query({gameUrl: $scope.$stateParams.gameUrl});

    $scope.onLocationError = function () {
        $scope.rejectedGeolocation = true;
    };

    $scope.onZoneCreated = function (event) {
        GameZone.save({gameUrl: $scope.$stateParams.gameUrl}, getLayerData(event.layer), success, error);
    };

    $scope.onZoneEdited = function (event) {
        angular.forEach(event.layers.getLayers(), function (layer) {
            GameZone.update({id: layer.id, gameUrl: $scope.$stateParams.gameUrl},
                getLayerData(layer), success, error);
        });
    };

    $scope.onZoneDeleted = function (event) {
        angular.forEach(event.layers.getLayers(), function (layer) {
            GameZone.remove({id: layer.id, gameUrl: $scope.$stateParams.gameUrl}, success, error);
        });
    };
});


/**
 * @ngdoc directive
 * @name subrosa.components.map:mapPoints
 *
 * @requires $compile
 * @requires $http
 * @requires leaflet
 * @requires leafletData
 *
 * @description
 *  Used to add points to an already existing map
 */
angular.module('subrosa.components.map').directive('mapPoints',
function ($compile, $http, $timeout, leaflet, leafletData) {
    const MIN_POPUP_WIDTH = 325;

    return {
        restrict: 'A',
        require: '^map',
        transclude: true,
        scope: {
            points: '=mapPoints',
            popupTemplateUrl: '=popupTemplateUrl'
        },
        link: function (scope, element, attributes, MapController) {
            var groups = {};

            leafletData.getMap(MapController.mapId).then(function (mapElement) {
                scope.points.$promise.then(function (points) {
                    angular.forEach(points, function (point) {
                        if (point.group) {
                            var marker = leaflet.marker([point.latitude, point.longitude]),
                                groupName = point.group;

                            if (scope.popupTemplateUrl) {
                                $http.get(scope.popupTemplateUrl).success(function (results) {
                                    var template, templateScope = scope.$new();
                                    templateScope[point.modelName] = point.model;

                                    template = $compile(results)(templateScope);

                                    $timeout(function () {
                                        marker.bindPopup(template.html(), {minWidth: MIN_POPUP_WIDTH});
                                    });
                                });
                            }

                            if (!angular.isDefined(groups[groupName])) {
                                groups[groupName] = new leaflet.MarkerClusterGroup();
                                mapElement.addLayer(groups[groupName]);
                            }

                            groups[groupName].addLayer(marker);
                        }
                    });
                });
            });
        }
    };
});


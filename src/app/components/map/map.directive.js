/**
 * @ngdoc directive
 * @name subrosa.components.map:map
 *
 * @requires $compile
 * @requires leaflet
 * @requires leafletData
 * @requires leafletMarkersHelpers
 *
 * @description
 *  A wrapper around leaflet-directive.
 */
angular.module('subrosa.components.map').directive('map',
function ($compile, $timeout, leaflet, leafletData, leafletMarkersHelpers) {
    var SHAPE_COLOR = '#E43E59';

    return {
        templateUrl: '/app/components/map/views/map.html',
        controller: 'MapController',
        scope: {
            allowCurrentLocation: '=allowCurrentLocation',
            allowEdit: '=allowEdit',
            center: '=?center',
            onLocationSuccess: '=onLocationSuccess',
            onLocationError: '=onLocationError',
            onCreated: '&onCreated',
            onDeleted: '&onDeleted',
            onEdited: '&onEdited',
            points: '=points',
            popupTemplateUrl: '=popupTemplateUrl',
            polygons: '=polygons'
        },
        compile: function (element) {
            // Set a random id on the element
            var id = Math.floor((Math.random() * 1000) + 1);
            angular.element(element.children()[0]).attr('id', id);

            return function (scope) {
                // Initialize the FeatureGroup to store shape layers
                scope.shapes = new leaflet.FeatureGroup();

                if (scope.allowCurrentLocation === true) {
                    var control = leaflet.control.locate({onLocationError: scope.onLocationError});
                    if (!angular.isArray(scope.controls.custom)) {
                        scope.controls.custom = [];
                    }
                    scope.controls.custom.push(control);
                }

                if (scope.allowEdit === true) {
                    // TODO move this into controller
                    scope.controls.draw.options.edit = {
                        featureGroup: scope.shapes
                    };

                    scope.createLayer = function (event) {
                        scope.shapes.addLayer(event.layer);
                        scope.onCreated({event: event});
                    };

                    scope.editLayer = function (event) {
                        scope.onEdited({event: event});
                    };

                    scope.deleteLayer = function (event) {
                        scope.shapes.removeLayer(event.layer);
                        scope.onDeleted({event: event});
                    };

                    leafletData.getMap(id).then(function (mapElement) {
                        // Add the shapes layer
                        mapElement.addLayer(scope.shapes);

                        // Handle events
                        mapElement.on('draw:created', scope.createLayer);
                        mapElement.on('draw:deleted', scope.deleteLayer);
                        mapElement.on('draw:edited', scope.editLayer);
                        leafletData.setMap(mapElement, id);
                    });
                }

                if (scope.polygons) {
                    leafletData.getMap(id).then(function (mapElement) {
                        // Add the shapes layer
                        mapElement.addLayer(scope.shapes);

                        // TODO this shouldn't require a $promise
                        if (scope.polygons.$promise) {
                            scope.polygons.$promise.then(function (polygons) {
                                angular.forEach(polygons, function (polygon) {
                                    var latLngs = [];
                                    angular.forEach(polygon.points, function (point) {
                                        latLngs.push(leaflet.latLng(point.latitude, point.longitude));
                                    });
                                    if (latLngs.length > 0) {
                                        polygon = new leaflet.polygon(latLngs, {color: SHAPE_COLOR});
                                        scope.shapes.addLayer(polygon);
                                    }
                                });

                                if (scope.shapes.getLayers().length > 0) {
                                    mapElement.fitBounds(scope.shapes.getBounds());
                                }
                                leafletData.setMap(mapElement, id);
                            });
                        }
                    });
                }

                if (scope.points) {
                    leafletData.getMap(id).then(function (mapElement) {
                        // TODO this shouldn't require a $promise
                        scope.points.then(function (points) {
                            angular.forEach(points, function (point) {
                                var marker = leaflet.marker([point.latitude, point.longitude]);

                                if (scope.popupTemplateUrl) {
                                    var template = angular.element('<div><div data-ng-include="\'' +
                                            scope.popupTemplateUrl  + '\'"></div></div>'),
                                        model = scope.$new();

                                    model[point.modelName] = point.model;
                                    template = $compile(template)(model);

                                    // TODO figure out way to do this without $timeout
                                    $timeout(function () {
                                        marker.bindPopup(template.html());
                                    }, 100);
                                }

                                point.group = point.group || id;
                                leafletMarkersHelpers.addMarkerToGroup(marker, point.group, mapElement);
                            });
                        });
                    });
                }
            };
        }
    };
});


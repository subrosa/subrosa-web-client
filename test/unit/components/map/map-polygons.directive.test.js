describe('Directive: mapPolygons', function () {
    'use strict';

    var $q, $compile, $scope, MockResource, leaflet, mapDraw, featureGroup, leafletData,
        mapElement, element, event;

    beforeEach(module('subrosa.components.map', 'mocks', '/app/components/map/views/map.html'));

    beforeEach(module(function ($provide) {
        var handler = function (map, callback) {
            callback(event);
        };

        leaflet = {
            control: {zoom: function () {}},
            Icon: {Default: {imagePath: ''}},
            latLng: function () {},
            polygon: function () {}
        };

        mapElement = {
            addControl: function () {},
            addLayer: function () {},
            fitBounds: function () {},
            on: function () {}
        };

        leafletData = {
            getMap: function () {
                var deferred = $q.defer();
                deferred.resolve(mapElement);
                return deferred.promise;
            }
        };

        event = {layer: 'layer'};
        mapDraw = {
            addControls: function () {},
            registerCreateHandler: handler,
            registerDeleteHandler: handler,
            registerEditHandler: handler
        };

        $provide.constant('leaflet', leaflet);
        $provide.value('leafletData', leafletData);
        $provide.value('mapDraw', mapDraw);
    }));

    beforeEach(module(function ($controllerProvider) {
        featureGroup = {
            addLayer: function () {},
            getBounds: function () {},
            getLayers: function () {
                return [];
            },
            removeLayer: function () {}
        };

        $controllerProvider.register('MapDirectiveController', function () {
            this.shapes = featureGroup;
        });
    }));

    beforeEach(inject(function (_$q_, _$compile_, _$rootScope_, _MockResource_) {
        $q = _$q_;
        $compile = _$compile_;
        $scope = _$rootScope_;
        MockResource = _MockResource_.$new();
    }));

    describe("can add draw controls", function () {
        beforeEach(function () {
            element = ['<div map="mapId">',
                         '<div map-polygons="polygons" draw="draw"></div>',
                       '</div>'
            ].join('');

            element = angular.element(element);
            $scope.polygons = MockResource.query();
        });

        it("if edit mode is enabled", function () {
            spyOn(mapDraw, 'addControls');
            $scope.draw = true;

            $compile(element)($scope);
            $scope.$digest();

            expect(mapDraw.addControls).toHaveBeenCalledWith(mapElement, featureGroup);
        });

        it("but not if edit mode is disabled", function () {
            spyOn(mapDraw, 'addControls');
            $scope.draw = false;

            $compile(element)($scope);
            $scope.$digest();

            expect(mapDraw.addControls).not.toHaveBeenCalled();
        });
    });

    describe("can register draw event handlers", function () {
        beforeEach(function () {
            $scope.callback = function () {};
            $scope.polygons = MockResource.query();
        });

        describe("for create", function () {
            beforeEach(function () {
                element = ['<div map="mapId">',
                             '<div map-polygons="polygons" draw="true" on-create="onCreate(event)"></div>',
                           '</div>'
                ].join('');
                element = angular.element(element);
                $scope.onCreate = $scope.callback;
            });

            it("and call the create handler", function () {
                spyOn(mapDraw, 'registerCreateHandler').and.callThrough();
                spyOn(featureGroup, 'addLayer');
                spyOn($scope, 'onCreate').and.callThrough();

                $compile(element)($scope);
                $scope.$digest();

                expect(mapDraw.registerCreateHandler).toHaveBeenCalledWith(mapElement, jasmine.any(Function));
                expect(featureGroup.addLayer).toHaveBeenCalledWith(event.layer);
                expect($scope.onCreate).toHaveBeenCalledWith(event);

            });

            it("but not call the other event handlers", function () {
                spyOn(mapDraw, 'registerDeleteHandler');
                spyOn(mapDraw, 'registerEditHandler');

                $compile(element)($scope);
                $scope.$digest();

                expect(mapDraw.registerDeleteHandler).not.toHaveBeenCalled();
                expect(mapDraw.registerEditHandler).not.toHaveBeenCalled();
            });
        });

        describe("for delete", function () {
            beforeEach(function () {
                element = ['<div map="mapId">',
                             '<div map-polygons="polygons" draw="true" on-delete="onDelete(event)"></div>',
                           '</div>'
                ].join('');
                element = angular.element(element);
                $scope.onDelete = $scope.callback;
            });

            it("and call the delete handler", function () {
                spyOn(mapDraw, 'registerDeleteHandler').and.callThrough();
                spyOn(featureGroup, 'removeLayer');
                spyOn($scope, 'onDelete').and.callThrough();

                $compile(element)($scope);
                $scope.$digest();

                expect(mapDraw.registerDeleteHandler).toHaveBeenCalledWith(mapElement, jasmine.any(Function));
                expect(featureGroup.removeLayer).toHaveBeenCalledWith(event.layer);
                expect($scope.onDelete).toHaveBeenCalledWith(event);

            });

            it("but not call the other event handlers", function () {
                spyOn(mapDraw, 'registerCreateHandler');
                spyOn(mapDraw, 'registerEditHandler');

                $compile(element)($scope);
                $scope.$digest();

                expect(mapDraw.registerCreateHandler).not.toHaveBeenCalled();
                expect(mapDraw.registerEditHandler).not.toHaveBeenCalled();
            });
        });

        describe("for edit", function () {
            beforeEach(function () {
                element = ['<div map="mapId">',
                             '<div map-polygons="polygons" draw="true" on-edit="onEdit(event)"></div>',
                           '</div>'
                ].join('');
                element = angular.element(element);
                $scope.onEdit = $scope.callback;
            });

            it("and call the edit handler", function () {
                spyOn(mapDraw, 'registerEditHandler').and.callThrough();
                spyOn($scope, 'onEdit').and.callThrough();

                $compile(element)($scope);
                $scope.$digest();

                expect(mapDraw.registerEditHandler).toHaveBeenCalledWith(mapElement, jasmine.any(Function));
                expect($scope.onEdit).toHaveBeenCalledWith(event);

            });

            it("but not call the other event handlers", function () {
                spyOn(mapDraw, 'registerCreateHandler');
                spyOn(mapDraw, 'registerDeleteHandler');

                $compile(element)($scope);
                $scope.$digest();

                expect(mapDraw.registerCreateHandler).not.toHaveBeenCalled();
                expect(mapDraw.registerDeleteHandler).not.toHaveBeenCalled();
            });
        });
    });

    describe("can display a map with polygons", function () {
        var elementScope, polygons;

        beforeEach(function () {
            element = angular.element('<div map="mapId"><div map-polygons="polygons"></div></div>');

            polygons = [
                {
                    points: [
                        {
                            latitude: 30,
                            longitude: 31
                        }
                    ]
                }
            ];

            MockResource.setSuccessResponse(polygons);
        });

        it("by adding the shapes layer to the map", function () {
            spyOn(mapElement, 'addLayer');

            $scope.polygons = MockResource.query();
            $compile(element)($scope);
            $scope.$digest();
            elementScope = element.isolateScope();

            expect(mapElement.addLayer).toHaveBeenCalledWith(featureGroup);
        });

        describe("by creating the polygons and adding them to the map.", function () {
            var mapId, polygon;
            beforeEach(function () {
                mapId = jasmine.any(Number);

                polygon = {
                    latLngs: []
                };

                spyOn(leaflet, 'latLng').and.returnValue('blah');
                spyOn(leaflet, 'polygon').and.returnValue(polygon);
                spyOn(featureGroup, 'addLayer');
                spyOn(featureGroup, 'getBounds').and.returnValue('bounds');
                spyOn(mapElement, 'fitBounds');
            });

            afterEach(function () {
                expect(leaflet.latLng).toHaveBeenCalledWith(30, 31);
                expect(leaflet.polygon).toHaveBeenCalledWith(['blah'], {color: '#E43E59'});
                expect(featureGroup.addLayer).toHaveBeenCalledWith(polygon);
            });

            it("if any layers exist", function () {
                spyOn(featureGroup, 'getLayers').and.returnValue(['layer']);

                $scope.polygons = MockResource.query();
                $compile(element)($scope);
                $scope.$digest();
                elementScope = element.isolateScope();

                expect(mapElement.fitBounds).toHaveBeenCalledWith('bounds');
            });

            it("but not if no layers exist", function () {
                spyOn(featureGroup, 'getLayers').and.returnValue([]);

                $scope.polygons = MockResource.query();
                $compile(element)($scope);
                $scope.$digest();
                elementScope = element.isolateScope();

                expect(mapElement.fitBounds).not.toHaveBeenCalled();
            });
        });
    });
});

describe('Directive: map', function () {
    var $q, $timeout, $httpBackend, $compile, $scope, MockResource, leaflet, featureGroupInstance, leafletData,
        leafletMarkersHelpers, mapElement, element;

    beforeEach(module('subrosa.components', 'mocks', '/app/components/map/views/map.html'));

    // Prevent actual dependent leaflet directive from running
    // TODO: is this a hack?
    angular.module("subrosa.components").directive("leaflet", function () {
        return {
            priority: 100000,
            terminal: true
        };
    });

    beforeEach(module(function ($provide) {
        $timeout = function (callback) {
            callback();
        };

        featureGroupInstance = {
            addLayer: function () {},
            getBounds: function () {},
            removeLayer: function () {}
        };

        leaflet = {
            control: {
                locate: function () {}
            },
            'FeatureGroup': function () {
                return featureGroupInstance;
            },
            Icon: {Default: {imagePath: ''}},
            latLng: function () {},
            marker: function () {},
            polygon: function () {}
        };

        mapElement = {
            addLayer: function () {},
            fitBounds: function () {},
            on: function () {}
        };

        leafletData = {
            $get: function () {
                return this;
            },
            getMap: function () {
                var deferred = $q.defer();
                deferred.resolve(mapElement);
                return deferred.promise;
            },
            setMap: function () {}
        };

        leafletMarkersHelpers = {
            addMarkerToGroup: function () {}
        };

        $provide.value('$timeout', $timeout);
        $provide.constant('leaflet', leaflet);
        $provide.value('leafletData', leafletData);
        $provide.value('leafletMarkersHelpers', leafletMarkersHelpers);
    }));


    beforeEach(inject(function (_$q_, _$httpBackend_, _$compile_, _$rootScope_, _MockResource_) {
        $q = _$q_;
        $httpBackend = _$httpBackend_;
        $compile = _$compile_;
        $scope = _$rootScope_;
        MockResource = _MockResource_.$new();
    }));

    describe("can display a map", function () {
        var elementScope;

        beforeEach(function () {
            element = angular.element('<div map></div>');

            $compile(element)($scope);
            $scope.$digest();
            elementScope = element.isolateScope();
        });

        it("by passing through to the leaflet directive.", function () {
            expect(element.html()).toContain('data-leaflet');
        });

        it("and setting a random id on the leaflet map element", function () {
            var id = parseInt(element.children().first().attr('id'), 10);
            expect(id).toEqual(jasmine.any(Number));
            expect(id).toBeGreaterThan(0);
            expect(id).toBeLessThan(1000);
        });

        it("sets up the shapes feature group on the $scope", function () {
            expect(elementScope.shapes).toBeDefined();
            expect(elementScope.shapes).toBe(featureGroupInstance);
        });

        it("does not display the current location or edit controls", function () {
            expect(elementScope.controls.draw).not.toBeDefined();
            expect(elementScope.controls.custom).not.toBeDefined();
        });
    });

    describe("can display a map that allows current location", function () {
        var elementScope;

        beforeEach(function () {
            $scope.error = function () {};
            element = angular.element(
                '<div map allow-current-location="true" ' +
                      'on-location-error="error">' +
                '</div>'
            );
        });

        it("and displays current location controls", function () {
            spyOn(leaflet.control, 'locate');

            $compile(element)($scope);
            $scope.$digest();
            elementScope = element.isolateScope();

            expect(leaflet.control.locate).toHaveBeenCalledWith({onLocationError: $scope.error});
            expect(elementScope.controls.custom).toBeDefined();
            expect(elementScope.controls.custom.length).toBe(1);
        });

        it("does not display the edit controls", function () {
            $compile(element)($scope);
            $scope.$digest();
            elementScope = element.isolateScope();

            expect(elementScope.controls.draw).not.toBeDefined();
        });
    });

    describe("can display a map that supports editing", function () {
        var elementScope;

        beforeEach(function () {
            element = angular.element(
                '<div map allow-edit="true" ' +
                      'on-created="onCreated(event)" ' +
                      'on-deleted="onDeleted(event)" ' +
                      'on-edited="onEdited(event)" ' +
                '</div>'
            );

            $scope.onCreated = function () {};
            $scope.onDeleted = function () {};
            $scope.onEdited = function () {};
        });

        it("by setting the feature group on the edit group layer", function () {
            $compile(element)($scope);
            $scope.$digest();
            elementScope = element.isolateScope();

            expect(elementScope.controls.draw.options.edit).toBeDefined();
            expect(elementScope.controls.draw.options.edit.featureGroup).toBe(featureGroupInstance);
        });

        it("by setting up map event handlers and updating the leafletData", function () {
            var mapId = jasmine.any(Number);

            spyOn(mapElement, 'on');
            spyOn(leafletData, 'setMap');

            $compile(element)($scope);
            $scope.$digest();
            elementScope = element.isolateScope();

            expect(mapElement.on).toHaveBeenCalledWith('draw:created', elementScope.createLayer);
            expect(mapElement.on).toHaveBeenCalledWith('draw:deleted', elementScope.deleteLayer);
            expect(mapElement.on).toHaveBeenCalledWith('draw:edited', elementScope.editLayer);
            expect(leafletData.setMap).toHaveBeenCalledWith(mapElement, mapId);
        });

        describe("by providing map functionality and then calling the event handlers", function () {
            var event;

            beforeEach(function () {
                event = {
                    layer: 'layer'
                };
                $compile(element)($scope);
                $scope.$digest();
                elementScope = element.isolateScope();
            });

            it("for creating layers", function () {
                spyOn(featureGroupInstance, 'addLayer');
                spyOn($scope, 'onCreated');

                elementScope.createLayer(event);

                expect(featureGroupInstance.addLayer).toHaveBeenCalledWith(event.layer);
                expect($scope.onCreated).toHaveBeenCalledWith(event);
            });

            it("for editing layers", function () {
                spyOn($scope, 'onEdited');

                elementScope.editLayer(event);

                expect($scope.onEdited).toHaveBeenCalledWith(event);
            });

            it("for removing layers", function () {
                spyOn(featureGroupInstance, 'removeLayer');
                spyOn($scope, 'onDeleted');

                elementScope.deleteLayer(event);

                expect(featureGroupInstance.removeLayer).toHaveBeenCalledWith(event.layer);
                expect($scope.onDeleted).toHaveBeenCalledWith(event);
            });
        });

        it("does not display the current location controls", function () {
            expect(elementScope.controls.custom).not.toBeDefined();
        });
    });

    describe("can display a map with existing polygons", function () {
        var elementScope, polygons;

        beforeEach(function () {
            element = angular.element('<div map polygons="polygons"></div>');

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

            $scope.polygons = [];
            $compile(element)($scope);
            $scope.$digest();
            elementScope = element.isolateScope();

            expect(mapElement.addLayer).toHaveBeenCalledWith(featureGroupInstance);
        });

        it("by creating the polygons and adding them to the map.", function () {
            var polygon = {
                latLngs: []
            }, mapId = jasmine.any(Number);

            spyOn(leaflet, 'latLng').andReturn('blah');
            spyOn(leaflet, 'polygon').andReturn(polygon);
            spyOn(featureGroupInstance, 'addLayer');
            spyOn(featureGroupInstance, 'getBounds').andReturn('bounds');
            spyOn(mapElement, 'fitBounds');
            spyOn(leafletData, 'setMap');

            $scope.polygons = MockResource.query();
            $compile(element)($scope);
            $scope.$digest();
            elementScope = element.isolateScope();

            expect(leaflet.latLng).toHaveBeenCalledWith(30, 31);
            expect(leaflet.polygon).toHaveBeenCalledWith(['blah'], {color: '#E43E59'});
            expect(featureGroupInstance.addLayer).toHaveBeenCalledWith(polygon);
            expect(mapElement.fitBounds).toHaveBeenCalledWith('bounds');
            expect(leafletData.setMap).toHaveBeenCalledWith(mapElement, mapId);
        });

        it("does not display the current location or edit controls", function () {
            expect(elementScope.controls.draw).not.toBeDefined();
            expect(elementScope.controls.custom).not.toBeDefined();
        });
    });

    describe("can display a map with markers", function () {
        var points;

        beforeEach(function () {
            element = angular.element('<div map points="points"></div>');

            points = [
                {
                    group: 'blah',
                    latitude: 30,
                    longitude: 31,
                    model: {hi: 'ya'},
                    modelName: 'hi'
                },
                {
                    latitude: 32,
                    longitude: 33,
                    model: {hi: 'yo'},
                    modelName: 'hi'
                }
            ];

            MockResource.setSuccessResponse({
                then: function (callback) {
                    callback(points);
                }
            });
        });

        it("by adding the markers to the map", function () {
            var expectedId;
            spyOn(leaflet, 'marker').andReturn('marker');
            spyOn(leafletMarkersHelpers, 'addMarkerToGroup');

            $scope.points = MockResource.query();
            $compile(element)($scope);
            $scope.$digest();
            expectedId = parseInt(angular.element(element.children()[0]).attr('id'), 10);

            expect(leaflet.marker).toHaveBeenCalledWith([30, 31]);
            expect(leafletMarkersHelpers.addMarkerToGroup).toHaveBeenCalledWith('marker',
                'blah', mapElement);
            expect(leaflet.marker).toHaveBeenCalledWith([32, 33]);
            expect(leafletMarkersHelpers.addMarkerToGroup).toHaveBeenCalledWith('marker',
                expectedId, mapElement);
        });

        describe("that have their own template popup", function () {
            var marker, expectedHtml;

            beforeEach(function () {
                element = angular.element('<div map points="points" ' +
                                               'popup-template-url="\'template.html\'">' +
                                          '</div>');
                marker = {
                    bindPopup: function () {}
                };

                expectedHtml = "<!-- ngInclude: 'template.html' -->";
                $httpBackend.expectGET('template.html').respond(expectedHtml);
            });

            afterEach(function () {
                $httpBackend.verifyNoOutstandingExpectation();
                $httpBackend.verifyNoOutstandingRequest();
            });

            it("by adding the markers to the map", function () {
                spyOn(leaflet, 'marker').andReturn(marker);
                spyOn(leafletMarkersHelpers, 'addMarkerToGroup');
                spyOn(marker, 'bindPopup');

                $scope.points = MockResource.query();
                $compile(element)($scope);
                $scope.$digest();
                $httpBackend.flush();

                expect(marker.bindPopup).toHaveBeenCalledWith(expectedHtml);
            });
        });
    });


});

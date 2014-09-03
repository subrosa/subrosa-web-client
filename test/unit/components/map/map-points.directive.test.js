describe('Directive: mapPoints', function () {
    var $q, $timeout, $httpBackend, $compile, $scope, MockResource, leaflet, leafletData,
        mapElement, element, markerClusterGroup;

    beforeEach(module('subrosa.components.map', 'mocks', '/app/components/map/views/map.html'));

    beforeEach(module(function ($controllerProvider) {
        $controllerProvider.register('MapDirectiveController', function () {});
    }));

    beforeEach(module(function ($provide) {
        $timeout = function (callback) {
            callback();
        };

        markerClusterGroup = {
            addLayer: function () {}
        };

        leaflet = {
            control: {zoom: function () {}},
            Icon: {Default: {imagePath: ''}},
            'MarkerClusterGroup': function () {
                return markerClusterGroup;
            },
            marker: function () {}
        };

        mapElement = {
            addLayer: function () {},
            addControl: function () {}
        };

        leafletData = {
            getMap: function () {
                var deferred = $q.defer();
                deferred.resolve(mapElement);
                return deferred.promise;
            }
        };

        $provide.value('$timeout', $timeout);
        $provide.constant('leaflet', leaflet);
        $provide.value('leafletData', leafletData);
    }));


    beforeEach(inject(function (_$q_, _$httpBackend_, _$compile_, _$rootScope_, _MockResource_) {
        $q = _$q_;
        $httpBackend = _$httpBackend_;
        $compile = _$compile_;
        $scope = _$rootScope_;
        MockResource = _MockResource_.$new();
    }));

    describe("can display a map with markers", function () {
        var points;

        beforeEach(function () {
            element = angular.element('<div map="mapId"><div map-points="points"></div></div>');

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

            MockResource.setSuccessResponse(points);
        });

        it("by adding the markers to the map", function () {
            spyOn(leaflet, 'marker').andReturn('marker');
            spyOn(mapElement, 'addLayer');
            spyOn(markerClusterGroup, 'addLayer');

            $scope.points = MockResource.query();
            $compile(element)($scope);
            $scope.$digest();

            expect(leaflet.marker).toHaveBeenCalledWith([30, 31]);
            expect(mapElement.addLayer).toHaveBeenCalledWith(markerClusterGroup);
            expect(markerClusterGroup.addLayer).toHaveBeenCalledWith('marker');
        });

        describe("that have their own template popup", function () {
            var marker, expectedHtml;

            beforeEach(function () {
                element = angular.element('<div map="mapId">' +
                    '<div map-points="points" popup-template-url="\'template.html\'">' +
                    '</div></div>');
                marker = {
                    bindPopup: function () {}
                };

                expectedHtml = '<div><div id="yo"></div></div>';
                $httpBackend.expectGET('template.html').respond(expectedHtml);
            });

            afterEach(function () {
                $httpBackend.verifyNoOutstandingExpectation();
                $httpBackend.verifyNoOutstandingRequest();
            });

            it("by adding the markers to the map", function () {
                var expected = angular.element(expectedHtml).html();
                spyOn(leaflet, 'marker').andReturn(marker);
                spyOn(marker, 'bindPopup');

                $scope.points = MockResource.query();
                $compile(element)($scope);
                $scope.$digest();
                $httpBackend.flush();

                expect(marker.bindPopup).toHaveBeenCalledWith(expected, {minWidth: 325});
            });
        });
    });


});

describe('Controller: EditGameZone', function () {
    var $controller, $scope, dependencies, deferred, leaflet, leafletData, GameZone, gameZone, events, map;
    beforeEach(module('subrosa.game', 'mocks'));

    beforeEach(inject(function ($q, _$controller_, $rootScope, MockResource) {
        $controller = _$controller_;
        $scope = $rootScope.$new();

        deferred = $q.defer();

        leaflet = {
            'FeatureGroup': function () {},
            'Control': {
                'Draw': function () {}
            },
            circle: function () {}
        };

        leafletData = {
            getMap: function () {
                return deferred.promise;
            }
        };

        events = {};
        map = {
            addControl: function () {},
            addLayer: function () {},
            locate: function () {},
            on: function (event, success) {
                events[event] = success;
            }
        };

        GameZone = MockResource.$new();
        gameZone = GameZone.get({id: 1});

        dependencies = {
            $scope: $scope,
            leaflet: leaflet,
            leafletData: leafletData,
            GameZone: GameZone
        };
    }));

    it("sets a default center for the map on the $scope", function () {
        $controller('EditGameZoneController', dependencies);
        expect($scope.center.lat).toBeDefined();
        expect($scope.center.lng).toBeDefined();
        expect($scope.center.zoom).toBeDefined();
    });

    it("sets a leaflet FeatureGroup on the $scope", function () {
        spyOn(leaflet, "FeatureGroup");
        $controller('EditGameZoneController', dependencies);
        expect(leaflet.FeatureGroup).toHaveBeenCalled();
        expect($scope.drawnItems).toBeDefined();
    });

    it("sets up the leaflet controls on the $scope", function () {
        $controller('EditGameZoneController', dependencies);
        expect($scope.controls).toBeDefined();
        expect(typeof $scope.controls).toBe('object');
    });


    describe("after the map is initialized", function () {
        beforeEach(function () {
            $controller('EditGameZoneController', dependencies);
        });

        it("it attempts to locate the user's location", function () {
            spyOn(map, 'locate');
            deferred.resolve(map);
            $scope.$digest();
            expect(map.locate).toHaveBeenCalledWith({setView: true, maxZoom: 16});
        });

        it("it adds the drawn items layer to the map", function () {
            spyOn(map, 'addLayer');
            deferred.resolve(map);
            $scope.$digest();
            expect(map.addLayer).toHaveBeenCalledWith($scope.drawnItems);
        });
    });

    describe("handles map events", function () {
        var layer;
        beforeEach(function () {
            layer = {id: 1, _latlngs: 'latlng'};
            $controller('EditGameZoneController', dependencies);
            $scope.$stateParams = {gameUrl: 'raleigh-wars'};
            deferred.resolve(map);
            $scope.$digest();
        });

        it("by drawing a circle on locationfound", function () {
            spyOn(leaflet, "circle").andReturn({addTo: function () {}});
            events.locationfound({accuracy: 4, latlng: 'bitcheye'});
            expect(leaflet.circle).toHaveBeenCalledWith('bitcheye', 2);

        });

        it("by setting $scope.rejectedGeolocation on locationerror", function () {
            spyOn(leaflet, "circle").andReturn({addTo: function () {}});
            events.locationerror();
            expect($scope.rejectedGeolocation).toBe(true);

        });

        describe("by saving the GameZone on draw:created", function () {
            beforeEach(function () {
                $scope.drawnItems.addLayer = function () {};
            });

            it("and succeeding", function () {
                spyOn(GameZone, 'save').andCallThrough();
                spyOn($scope.drawnItems, 'addLayer');
                GameZone.setSuccessResponse({id: 1});

                events['draw:created']({layer: angular.copy(layer)});

                expect(GameZone.save).toHaveBeenCalledWith({ gameUrl : 'raleigh-wars' }, { points : 'latlng' },
                    jasmine.any(Function), jasmine.any(Function));
                expect($scope.drawnItems.addLayer).toHaveBeenCalledWith(layer);
            });

            it("and failing", function () {
                var error = {data: {notifications: [{severity: "ERROR", "code": 10000010008}]}};
                GameZone.setErrorResponse(error);

                GameZone.failed = true;
                events['draw:created']({layer: layer});

                expect($scope.notifications.length).toBe(1);
                expect($scope.notifications).toBe(error.data.notifications);
            });
        });

        describe("", function () {
            var layers;

            beforeEach(function () {
                layers = {
                    getLayers: function () {
                        return [layer];
                    }
                };
            });

            it("by updating the GameZone on draw:edited", function () {
                spyOn(GameZone, 'update').andCallThrough();
                events['draw:edited']({layers: layers});
                expect(GameZone.update).toHaveBeenCalledWith({id: layer.id, gameUrl : 'raleigh-wars' }, { points : 'latlng' });
            });

            it("by deleting the GameZone on draw:deleted", function () {
                spyOn(GameZone, 'remove').andCallThrough();
                events['draw:deleted']({layers: layers});
                expect(GameZone.remove).toHaveBeenCalledWith({id: layer.id, gameUrl : 'raleigh-wars' });
            });
        });
    });
});
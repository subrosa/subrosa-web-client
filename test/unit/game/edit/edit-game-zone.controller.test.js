describe('Controller: EditGameZone', function () {
    var $controller, $scope, dependencies, GameZone;
    beforeEach(module('subrosa.game', 'mocks'));

    beforeEach(inject(function ($q, _$controller_, $rootScope, MockResource) {
        $controller = _$controller_;
        $scope = $rootScope.$new();

        $scope.$stateParams = {gameUrl: 'raleigh-wars'};

        GameZone = MockResource.$new();
        dependencies = {
            $scope: $scope,
            GameZone: GameZone
        };
    }));

    it("sets the existing game layer on the scope", function () {
        spyOn(GameZone, 'query').andCallThrough();

        $controller('EditGameZoneController', dependencies);

        expect(GameZone.query).toHaveBeenCalledWith({gameUrl: 'raleigh-wars'});
        expect($scope.gameZones).toBe(GameZone.query());
    });

    describe("sets up map listeners", function () {
        var error = {
            data: {
                notifications: 'lalala'
            }
        };

        beforeEach(function () {
            $controller('EditGameZoneController', dependencies);
        });

        it("for onLocationError", function () {
            $scope.onLocationError();
            expect($scope.rejectedGeolocation).toBe(true);
        });

        describe("for onZoneCreated", function () {
            var event;

            beforeEach(function () {
                event = {
                    layer: {
                        _latlngs: []
                    },
                    layers: {
                        getLayers: function () {
                            return [];
                        }
                    }
                };
                spyOn(GameZone, 'save').andCallThrough();
            });

            afterEach(function () {
                expect(GameZone.save).toHaveBeenCalledWith({gameUrl: 'raleigh-wars'},
                    {points: event.layer._latlngs}, jasmine.any(Function), jasmine.any(Function));
            });

            it("and be successful", function () {
                $scope.onZoneCreated(event);
            });

            it("and error", function () {
                GameZone.setErrorResponse(error);
                GameZone.failed = true;

                $scope.onZoneCreated(event);

                expect($scope.notifications).toBe(error.data.notifications);
            });
        });

        describe("for onZoneEdited", function () {
            var event;

            beforeEach(function () {
                event = {
                    layers: {
                        getLayers: function () {
                            return [
                                {
                                    id: 1,
                                    _latlngs: []
                                }
                            ];
                        }
                    }
                };
                spyOn(GameZone, 'update').andCallThrough();
            });

            afterEach(function () {
                expect(GameZone.update).toHaveBeenCalledWith({id: 1, gameUrl: 'raleigh-wars'},
                    {points: event.layers.getLayers()[0]._latlngs}, jasmine.any(Function),
                    jasmine.any(Function));
            });

            it("and be successful", function () {
                $scope.onZoneEdited(event);
            });

            it("and error", function () {
                GameZone.setErrorResponse(error);
                GameZone.failed = true;

                $scope.onZoneEdited(event);

                expect($scope.notifications).toBe(error.data.notifications);
            });
        });

        describe("for onZoneDeleted", function () {
            var event;

            beforeEach(function () {
                event = {
                    layers: {
                        getLayers: function () {
                            return [
                                {
                                    id: 1,
                                    _latlngs: []
                                }
                            ];
                        }
                    }
                };
                spyOn(GameZone, 'remove').andCallThrough();
            });

            afterEach(function () {
                expect(GameZone.remove).toHaveBeenCalledWith({id: 1, gameUrl: 'raleigh-wars'},
                    jasmine.any(Function), jasmine.any(Function));
            });

            it("and be successful", function () {
                $scope.onZoneDeleted(event);
            });

            it("and error", function () {
                GameZone.setErrorResponse(error);
                GameZone.failed = true;

                $scope.onZoneDeleted(event);

                expect($scope.notifications).toBe(error.data.notifications);
            });
        });
    });
});
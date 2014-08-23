describe('Controller: EditGameZone', function () {
    var $controller, $scope, dependencies, gameZone;
    beforeEach(module('subrosa.game', 'mocks'));

    beforeEach(inject(function ($q, _$controller_, $rootScope, MockResource) {
        $controller = _$controller_;
        $scope = $rootScope.$new();

        $scope.$stateParams = {gameUrl: 'raleigh-wars'};

        gameZone = MockResource.$new();
        dependencies = {
            $scope: $scope,
            gameZone: gameZone
        };
    }));

    it("sets the existing game layer on the scope", function () {
        spyOn(gameZone, 'query').andCallThrough();

        $controller('EditGameZoneController', dependencies);

        expect(gameZone.query).toHaveBeenCalledWith({gameUrl: 'raleigh-wars'});
        expect($scope.gameZones).toBe(gameZone.query());
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
                spyOn(gameZone, 'save').andCallThrough();
            });

            afterEach(function () {
                expect(gameZone.save).toHaveBeenCalledWith({gameUrl: 'raleigh-wars'},
                    {points: event.layer._latlngs}, jasmine.any(Function), jasmine.any(Function));
            });

            it("and be successful", function () {
                $scope.onZoneCreated(event);
            });

            it("and error", function () {
                gameZone.setErrorResponse(error);
                gameZone.failed = true;

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
                spyOn(gameZone, 'update').andCallThrough();
            });

            afterEach(function () {
                expect(gameZone.update).toHaveBeenCalledWith({id: 1, gameUrl: 'raleigh-wars'},
                    {points: event.layers.getLayers()[0]._latlngs}, jasmine.any(Function),
                    jasmine.any(Function));
            });

            it("and be successful", function () {
                $scope.onZoneEdited(event);
            });

            it("and error", function () {
                gameZone.setErrorResponse(error);
                gameZone.failed = true;

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
                spyOn(gameZone, 'remove').andCallThrough();
            });

            afterEach(function () {
                expect(gameZone.remove).toHaveBeenCalledWith({id: 1, gameUrl: 'raleigh-wars'},
                    jasmine.any(Function), jasmine.any(Function));
            });

            it("and be successful", function () {
                $scope.onZoneDeleted(event);
            });

            it("and error", function () {
                gameZone.setErrorResponse(error);
                gameZone.failed = true;

                $scope.onZoneDeleted(event);

                expect($scope.notifications).toBe(error.data.notifications);
            });
        });
    });
});

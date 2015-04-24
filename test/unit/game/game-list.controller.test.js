describe('Controller: GameListController', function () {
    var $controller, $scope, successfulCall, geolocation, geocoder,
        currentLocation, geocoderResults, MockGameFactory;

    beforeEach(module('subrosa.game', 'mocks'));

    beforeEach(function () {
        successfulCall = true;

        geolocation = {
            getLocation: function () {
                return {
                    then: function (success, error) {
                        if (successfulCall) {
                            success(currentLocation);
                        } else {
                            error();
                        }
                    }
                };
            }
        };

        geocoder = {
            geocode: function () {
                return {
                    then: function (success, error) {
                        if (successfulCall) {
                            success(geocoderResults);
                        } else {
                            error();
                        }
                    }
                };
            }
        };
    });

    beforeEach(inject(function (_$controller_, $rootScope, MockResource) {
        $controller = _$controller_;
        $scope = $rootScope.$new();
        MockGameFactory = MockResource.$new();
        MockGameFactory.queryPoints = MockGameFactory.query;

        spyOn(MockGameFactory, "query").and.callThrough();
        spyOn(MockGameFactory, "queryPoints").and.callThrough();

        $controller('GameListController', {$scope: $scope, geolocation: geolocation,
            geocoder: geocoder, Game: MockGameFactory});
    }));

    it("sets the game list on the $scope", function () {
        expect(MockGameFactory.query).toHaveBeenCalledWith({limit: 0});
        expect($scope.games).toEqual(MockGameFactory.query());
        expect($scope.games.results.length).toBe(1);
    });

    it("sets the game marker list on the $scope", function () {
        expect(MockGameFactory.queryPoints).toHaveBeenCalledWith({limit: 0});
        expect($scope.games).toEqual(MockGameFactory.queryPoints());
        expect($scope.games.results.length).toBe(1);
    });

    it("provides a function for location errors", function () {
        expect($scope.rejectedGeolocation).toBe(undefined);
        $scope.onLocationError();
        expect($scope.rejectedGeolocation).toBe(true);
    });

    describe("can get games that are close to the current location", function () {
        var expected;

        beforeEach(function () {
            currentLocation = {
                coords: {
                    latitude: 30,
                    longitude: 40
                }
            };

            geocoderResults = [{
                geometry: {
                    location: {
                        lat: function () {
                            return 1;
                        },
                        lng: function () {
                            return 2;
                        }
                    }
                }
            }];
        });

        describe("via geolocation", function () {
            it("and succeed", function () {
                expected = {
                    limit: 0,
                    latitude: currentLocation.coords.latitude,
                    longitude: currentLocation.coords.longitude
                };
                spyOn(geolocation, 'getLocation').and.callThrough();

                $scope.sortByDistance();

                expect(geolocation.getLocation).toHaveBeenCalled();
                expect(MockGameFactory.query).toHaveBeenCalledWith(expected);
            });

            it("and fail", function () {
                successfulCall = false;
                $scope.sortByDistance();
                expect($scope.locationDenied).toBe(true);
            });
        });

        describe("via postal code", function () {
            it("and succeed", function () {
                var postalCode = '27601';
                expected = {
                    limit: 0,
                    latitude: geocoderResults[0].geometry.location.lat(),
                    longitude: geocoderResults[0].geometry.location.lng()
                };
                spyOn(geocoder, 'geocode').and.callThrough();

                $scope.sortByPostalCode(postalCode);

                expect(geocoder.geocode).toHaveBeenCalledWith({address: postalCode});
                expect(MockGameFactory.query).toHaveBeenCalledWith(expected);
            });

            it("and fail", function () {
                successfulCall = false;
                $scope.sortByPostalCode('abcde');
                expect($scope.notifications.length).toBe(1);
                expect($scope.notifications[0].message).toBe('Cannot find postal code: abcde');
                expect($scope.notifications[0].type).toBe('error');
            });
        });
    });
});


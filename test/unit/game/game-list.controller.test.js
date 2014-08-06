describe('Controller: GameListController', function () {
    var $controller, $scope, geolocation, currentLocation, MockGameFactory;

    beforeEach(module('subrosa.game', 'mocks'));

    beforeEach(function () {
        currentLocation = {
            coords: {
                latitude: 30,
                longitude: 40
            }
        };

        geolocation = {
            getLocation: function () {
                return {
                    then: function (callback) {
                        callback(currentLocation);
                    }
                };
            }
        };
    });

    beforeEach(inject(function (_$controller_, $rootScope, MockResource) {
        $controller = _$controller_;
        $scope = $rootScope.$new();
        MockGameFactory = MockResource.$new();

        spyOn(MockGameFactory, "query").andCallThrough();
        $controller('GameListController', {$scope: $scope, geolocation: geolocation,
            Game: MockGameFactory});
    }));

    it("sets the games on the $scope", function () {
        expect(MockGameFactory.query).toHaveBeenCalledWith({limit: 0});
        expect($scope.games).toEqual(MockGameFactory.query());
        expect($scope.games.results.length).toBe(1);
    });

    it("can get games that are close to the current location.", function () {
        var expected = {
            limit: 0,
            latitude: currentLocation.coords.latitude,
            longitude: currentLocation.coords.longitude
        };
        spyOn(geolocation, 'getLocation').andCallThrough();

        $scope.getCloseGames();

        expect(geolocation.getLocation).toHaveBeenCalled();
        expect(MockGameFactory.query).toHaveBeenCalledWith(expected);
    });
});


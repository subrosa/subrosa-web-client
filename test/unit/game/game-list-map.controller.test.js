/*global $*/
describe('Controller: GameListMapController', function () {
    var $controller, $scope, $q, deferred, MockResource;

    beforeEach(module('subrosa.game', 'mocks'));

    beforeEach(function () {
        deferred = {
            promise: 'promise',
            resolve: function () {}
        };

        $q = {
            defer: function () {
                return deferred;
            }
        };
    });

    beforeEach(inject(function (_$controller_, $rootScope, _MockResource_) {
        $controller = _$controller_;
        $scope = $rootScope.$new();

        MockResource = _MockResource_.$new();
    }));

    it("provides a function for location errors", function () {
        $scope.games = MockResource.query();
        $controller('GameListMapController', {$scope: $scope, $q: $q});
        expect($scope.rejectedGeolocation).toBe(undefined);

        $scope.onLocationError();

        expect($scope.rejectedGeolocation).toBe(true);
    });

    it("sets the game marker promise on the $scope", function () {
        spyOn($q, 'defer').andCallThrough();

        $scope.games = MockResource.query();
        $controller('GameListMapController', {$scope: $scope, $q: $q});

        expect($q.defer).toHaveBeenCalled();
        expect($scope.markers).toBe(deferred.promise);
    });

    describe("sets the actual game markers on the $scope", function () {
        it("to marker objects if they have locations and replaces dashes in the URLs", function () {
            var marker, games = {
                results: [
                    {
                        url: 'i-have-dashes',
                        location: {
                            latitude: 20,
                            longitude: 21
                        }
                    }
                ]
            };

            spyOn(deferred, 'resolve');

            MockResource.setSuccessResponse(games);
            $scope.games = MockResource.query();
            $controller('GameListMapController', {$scope: $scope, $q: $q});

            marker = deferred.resolve.calls[0].args[0].ihavedashes;

            expect(marker.group).toBe('games');
            expect(marker.latitude).toBe(20);
            expect(marker.longitude).toBe(21);
            expect(marker.modelName).toBe('game');
            expect(marker.model).toBe(games.results[0]);
        });

        it("to an empty object if no games have locations", function () {
            spyOn(deferred, 'resolve');

            MockResource.setSuccessResponse({results: []});
            $scope.games = MockResource.query();
            $controller('GameListMapController', {$scope: $scope, $q: $q});

            expect($.isEmptyObject(deferred.resolve.calls[0].args[0])).toBe(true);
        });
    });
});


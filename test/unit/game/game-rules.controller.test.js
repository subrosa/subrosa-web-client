describe('Controller: GameRulesController', function () {
    var $controller, $scope, MockGameZoneFactory;

    beforeEach(module('subrosa.game', 'mocks'));

    beforeEach(inject(function (_$controller_, $rootScope, MockResource) {
        $controller = _$controller_;
        $scope = $rootScope.$new();
        $scope.$stateParams = {gameUrl: 'raleigh-wars'};
        MockGameZoneFactory = MockResource.$new();
    }));

    it("sets the game zones on the $scope.", function () {
        spyOn(MockGameZoneFactory, "query").andCallThrough();
        $controller('GameRulesController', {$scope: $scope, GameZone: MockGameZoneFactory});

        expect(MockGameZoneFactory.query).toHaveBeenCalled();
        expect($scope.gameZones).toEqual(MockGameZoneFactory.query());
        expect($scope.gameZones.results.length).toBe(1);
    });
});


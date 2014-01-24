describe('Controller: Game', function () {
    var $scope, MockGameFactory;

    beforeEach(module('subrosa.game'));

    beforeEach(module(function ($provide) {
        MockGameFactory = {
            get: function () {
                return {
                    name: "Raleigh Wars",
                    url: "raleigh-wars"
                };
            }
        };
        spyOn(MockGameFactory, "get").andCallThrough();
        $provide.value('Game', MockGameFactory);
    }));

    beforeEach(inject(function ($controller, $rootScope) {
        $scope = $rootScope.$new();
        $scope.$stateParams = {gameUrl: 'raleigh-wars'};
        $controller('GameController', {$scope: $scope});
    }));

    it('sets the game on the $scope by calling the Game Service.', function () {
        expect(MockGameFactory.get).toHaveBeenCalledWith({gameUrl: 'raleigh-wars'}, jasmine.any(Function));
        expect($scope.game.name).toBe(MockGameFactory.get().name);
        expect($scope.game.url).toBe(MockGameFactory.get().url);
    });
});
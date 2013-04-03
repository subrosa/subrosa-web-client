'use strict'

describe('GameInitController', function() {
    var rootScope;

    var MockGameService;
    beforeEach(module(function($provide) {
        MockGameService = {
            get: function () {
                return {
                    name: "Raleigh Wars",
                    url: "raleigh-wars"
                };
            }
        };
        spyOn(MockGameService, "get").andCallThrough();
        $provide.value('Game', MockGameService);
    }));

    beforeEach(inject(function($controller, $rootScope) {
        rootScope = $rootScope.$new();
        $controller('GameInitController', {$rootScope: rootScope});
    }));

    it('sets the game on the $rootScope by calling the Game Service.', function() {

        expect(MockGameService.get).toHaveBeenCalled();
        expect(rootScope.game.name).toBe(MockGameService.get().name);
        expect(rootScope.game.url).toBe(MockGameService.get().url);
    });
});
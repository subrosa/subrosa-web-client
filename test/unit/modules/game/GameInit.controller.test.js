'use strict'

describe('GameInitController', function() {
    var rootScope, MockGameFactory;

    beforeEach(module('subrosa.game', 'js/game/views/game-menu.html', 'js/game/views/game-summary.html'));

    beforeEach(module(function($provide) {
        MockGameFactory = {
            get: function() {
                return {
                    name: "Raleigh Wars",
                    url: "raleigh-wars"
                };
            }
        };
        spyOn(MockGameFactory, "get").andCallThrough();
        $provide.value('Game', MockGameFactory);
    }));

    beforeEach(inject(function($controller, $rootScope) {
        rootScope = $rootScope;
        $controller('GameInitController', {$rootScope: rootScope});
    }));

    it('sets the game on the $rootScope by calling the Game Service.', function() {
        expect(MockGameFactory.get).toHaveBeenCalled();
        expect(rootScope.game.name).toBe(MockGameFactory.get().name);
        expect(rootScope.game.url).toBe(MockGameFactory.get().url);
    });
});
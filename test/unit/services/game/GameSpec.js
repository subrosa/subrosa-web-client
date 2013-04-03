'use strict'

describe('Game service', function() {
    var gameService, $httpBackend, $location, game;

    beforeEach(function() {
        game = {name: "Raleigh Wars", url: "raleigh-wars"};

        module(function($provide) {
            $location = {
                path: function () { return "/raleigh-wars/rules"; }
            };
            $provide.value('$location', $location);
        });

        inject(function($injector) {
            $httpBackend = $injector.get('$httpBackend');
            gameService = $injector.get('Game');
        });
    });

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('make a request to get the game from the API.', function() {
        $httpBackend.expectGET('/subrosa-api/v1/game/raleigh-wars').respond(game);
        gameService.get(function (response) {
            expect(response.name).toBe(game.name);
            expect(response.url).toBe(game.url);
        });
        $httpBackend.flush();
    });

    it('maintains a cache of requests.', function() {
        $httpBackend.expectGET('/subrosa-api/v1/game/raleigh-wars').respond("");
        gameService.get();
        $httpBackend.flush();
        gameService.get();
        $httpBackend.verifyNoOutstandingRequest();
    });

});


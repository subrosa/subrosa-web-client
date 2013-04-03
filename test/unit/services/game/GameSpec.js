'use strict'

describe('Game service', function() {
    var gameService, $httpBackend, $location, game;

    beforeEach(function() {
        module(function($provide) {
            $location = {
                path: function () { return "/raleigh-wars/feed"; }
            };
            $provide.value('$location', $location);
        });

        inject(function($injector) {
            game = {name: "Raleigh Wars", url: "raleigh-wars"};
            $httpBackend = $injector.get('$httpBackend');
            $httpBackend.when('GET', '/subrosa-api/v1/game/raleigh-wars').respond(game);

            gameService = $injector.get('Game');
        });

        spyOn(gameService, "get").andCallThrough();
    });

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('make a request to get the game from the API.', function() {
        $httpBackend.expectGET('/subrosa-api/v1/game/raleigh-wars');
        gameService.get();
        $httpBackend.flush();
    });

});


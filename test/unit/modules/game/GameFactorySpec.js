'use strict'

describe('Game Factory', function() {
    var gameFactory, $httpBackend, $location, game;

    beforeEach(module('subrosa.game'));

    beforeEach(function () {
        game = {name: "Raleigh Wars", url: "raleigh-wars"};

        module(function($provide) {
            $location = {
                path: function () { return "/raleigh-wars/rules"; }
            };
            $provide.value('$location', $location);
        });

        inject(function($injector) {
            $httpBackend = $injector.get('$httpBackend');
            gameFactory = $injector.get('Game');
        });
    });

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('make a request to get the game from the API.', function () {
        $httpBackend.expectGET('/subrosa-api/v1/game/raleigh-wars').respond(game);
        gameFactory.get(function (response) {
            expect(response.name).toBe(game.name);
            expect(response.url).toBe(game.url);
        });
        $httpBackend.flush();
    });

    it('maintains a cache of requests.', function () {
        $httpBackend.expectGET('/subrosa-api/v1/game/raleigh-wars').respond("");
        gameFactory.get();
        $httpBackend.flush();
        gameFactory.get();
        $httpBackend.verifyNoOutstandingRequest();
    });

});


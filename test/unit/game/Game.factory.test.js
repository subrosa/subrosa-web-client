describe('Game Factory', function () {
    var gameFactory, $httpBackend, $location, game;

    beforeEach(module('subrosa.game'));

    beforeEach(function () {
        game = {name: "Raleigh Wars", url: "raleigh-wars"};

        inject(function ($injector) {
            $httpBackend = $injector.get('$httpBackend');
            gameFactory = $injector.get('Game');
        });
    });

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('makes a request to get the game from the API.', function () {
        $httpBackend.expectGET('/subrosa/v1/game/raleigh-wars').respond(game);
        gameFactory.get({gameUrl: 'raleigh-wars'}, function (response) {
            expect(response.name).toBe(game.name);
            expect(response.url).toBe(game.url);
        });
        $httpBackend.flush();
    });
});


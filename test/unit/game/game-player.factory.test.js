describe('Factory: GamePlayer', function () {
    var gamePlayerFactory, $httpBackend, player;

    beforeEach(module('subrosa.game'));

    beforeEach(function () {
        player = {id: "1234", username: "yo", email: "yoyo@yo.com"};

        inject(function ($injector) {
            $httpBackend = $injector.get('$httpBackend');
            gamePlayerFactory = $injector.get('GamePlayer');
        });
    });

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('make a request to get the player from the API.', function () {
        $httpBackend.expectGET('/subrosa/v1/game/raleigh-wars/player/1234').respond(player);
        gamePlayerFactory.get({url: 'raleigh-wars', id: 1234}, function (response) {
            expect(response.id).toBe(player.id);
            expect(response.username).toBe(player.username);
            expect(response.email).toBe(player.email);
        });
        $httpBackend.flush();
    });
});


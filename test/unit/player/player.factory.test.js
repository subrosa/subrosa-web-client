describe('Factory: Player', function () {
    var playerFactory, $httpBackend, player;

    beforeEach(module('subrosa.player'));

    beforeEach(function () {
        player = {id: "1234", username: "yo", email: "yoyo@yo.com"};

        inject(function ($injector) {
            $httpBackend = $injector.get('$httpBackend');
            playerFactory = $injector.get('Player');
        });
    });

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('make a request to get the player from the API.', function () {
        $httpBackend.expectGET('/subrosa/v1/account/abcd/player/1234').respond(player);
        playerFactory.get({accountId: 'abcd', id: 1234}, function (response) {
            expect(response.id).toBe(player.id);
            expect(response.username).toBe(player.username);
            expect(response.email).toBe(player.email);
        });
        $httpBackend.flush();
    });
});

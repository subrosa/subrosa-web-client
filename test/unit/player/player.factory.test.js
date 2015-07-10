describe('Factory: Player', function () {
    'use strict';

    var playerFactory, $httpBackend, player, API_CONFIG;

    beforeEach(module('subrosa.player'));

    beforeEach(function () {
        player = {id: "1234", username: "yo", email: "yoyo@yo.com"};

        inject(function ($injector) {
            $httpBackend = $injector.get('$httpBackend');
            playerFactory = $injector.get('Player');
            API_CONFIG = $injector.get('API_CONFIG');
        });
    });

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('make a request to get the player from the API.', function () {
        $httpBackend.expectGET(API_CONFIG.URL + '/user/player/1234').respond(player);
        playerFactory.get({id: 1234}, function (response) {
            expect(response.id).toBe(player.id);
            expect(response.name).toBe(player.name);
            expect(response.email).toBe(player.email);
        });
        $httpBackend.flush();
    });
});


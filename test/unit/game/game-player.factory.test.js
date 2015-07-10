describe('Factory: GamePlayer', function () {
    'use strict';

    var gamePlayerFactory, $httpBackend, player, API_CONFIG;

    beforeEach(module('subrosa.game'));

    beforeEach(function () {
        player = {id: "1234", name: "yo", email: "yoyo@yo.com"};

        inject(function ($injector) {
            $httpBackend = $injector.get('$httpBackend');
            gamePlayerFactory = $injector.get('GamePlayer');
            API_CONFIG = $injector.get('API_CONFIG');
        });
    });

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('make a request to get the player from the API.', function () {
        $httpBackend.expectGET(API_CONFIG.URL + '/game/raleigh-wars/player/1234').respond(player);
        gamePlayerFactory.get({url: 'raleigh-wars', id: 1234}, function (response) {
            expect(response.id).toBe(player.id);
            expect(response.name).toBe(player.name);
            expect(response.email).toBe(player.email);
        });
        $httpBackend.flush();
    });
});


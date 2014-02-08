describe('Factory: Game', function () {
    var gameFactory, $httpBackend;

    beforeEach(module('subrosa.game'));

    beforeEach(inject(function ($injector) {
        $httpBackend = $injector.get('$httpBackend');
        gameFactory = $injector.get('Game');
    }));

    afterEach(function () {
        $httpBackend.flush();
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('makes a request to get the game from the API.', function () {
        $httpBackend.expectGET('/subrosa/v1/game/raleigh-wars').respond();
        gameFactory.get({url: 'raleigh-wars'});
    });

    it('makes a request to query the list of games from the API.', function () {
        $httpBackend.expectGET('/subrosa/v1/game').respond();
        gameFactory.query();
    });

    it('makes a request to update a game.', function () {
        $httpBackend.expectPUT('/subrosa/v1/game/raleigh-wars').respond();
        gameFactory.update({url: 'raleigh-wars'});
    });
});


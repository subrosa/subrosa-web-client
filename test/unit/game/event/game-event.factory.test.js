describe('Factory: GameEvent', function () {
    var GameEventFactory, $httpBackend, API_CONFIG;

    beforeEach(module('subrosa.game'));

    beforeEach(inject(function ($injector) {
        $httpBackend = $injector.get('$httpBackend');
        GameEventFactory = $injector.get('GameEvent');
        API_CONFIG = $injector.get('API_CONFIG');
    }));

    afterEach(function () {
        $httpBackend.flush();
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('makes a request to get the game zone from the API.', function () {
        $httpBackend.expectGET(API_CONFIG.URL + '/game/raleigh-wars/event/1').respond();
        GameEventFactory.get({gameUrl: 'raleigh-wars', id: 1});
    });

    it('makes a request to query the list of game zones from the API.', function () {
        $httpBackend.expectGET(API_CONFIG.URL + '/game/raleigh-wars/event').respond();
        GameEventFactory.query({gameUrl: 'raleigh-wars'});
    });

    it('makes a request to update a game zone.', function () {
        $httpBackend.expectPUT(API_CONFIG.URL + '/game/raleigh-wars/event/1').respond();
        GameEventFactory.update({gameUrl: 'raleigh-wars', id: 1});
    });
});


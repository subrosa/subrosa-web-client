describe('Factory: GameType', function () {
    var gameTypeFactory, $httpBackend, API_CONFIG;

    beforeEach(module('subrosa.game'));

    beforeEach(inject(function ($injector) {
        gameTypeFactory = $injector.get('GameType');
    }));

    describe("makes a request", function () {
        beforeEach(inject(function ($injector) {
            $httpBackend = $injector.get('$httpBackend');
            API_CONFIG = $injector.get('API_CONFIG');
        }));

        afterEach(function () {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        it('to get the game type from the API.', function () {
            $httpBackend.expectGET(API_CONFIG.URL + '/game-type/1').respond();
            gameTypeFactory.get({id: 1});
            $httpBackend.flush();
        });

        it('to query the list of game types from the API.', function () {
            $httpBackend.expectGET(API_CONFIG.URL + '/game-type').respond();
            gameTypeFactory.query();
            $httpBackend.flush();
        });

        it('to update a game type.', function () {
            $httpBackend.expectPUT(API_CONFIG.URL + '/game-type/1').respond();
            gameTypeFactory.update({id: 1});
            $httpBackend.flush();
        });

        it('to delete a game type.', function () {
            $httpBackend.expectDELETE(API_CONFIG.URL + '/game-type/1').respond();
            gameTypeFactory.delete({id: 1});
            $httpBackend.flush();
        });
    });
});


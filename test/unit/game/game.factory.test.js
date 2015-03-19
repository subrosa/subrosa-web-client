describe('Factory: game', function () {
    var gameFactory, $httpBackend, API_CONFIG;

    beforeEach(module('subrosa.game'));

    beforeEach(inject(function ($injector) {
        gameFactory = $injector.get('Game');
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

        it('to get the game from the API.', function () {
            $httpBackend.expectGET(API_CONFIG.URL + '/game/raleigh-wars').respond();
            gameFactory.get({url: 'raleigh-wars'});
            $httpBackend.flush();
        });

        it('to query the list of games from the API.', function () {
            $httpBackend.expectGET(API_CONFIG.URL + '/game').respond();
            gameFactory.query();
            $httpBackend.flush();
        });

        describe('to query the game points from the API by transforming the response', function () {
            var promise, response;

            beforeEach(function () {
                response = {
                    results: [{
                        url: 'raleigh-wars',
                        location: {
                            latitude: 1,
                            longitude: 2
                        }
                    }]
                };
                $httpBackend.expectGET(API_CONFIG.URL + '/game').respond(response);
            });

            it('and have a game with a location', function () {
                promise = gameFactory.queryPoints();
                $httpBackend.flush();

                expect(typeof promise.raleighwars).toBe('object');
                expect(promise.raleighwars.group).toBe('games');
                expect(promise.raleighwars.latitude).toBe(1);
                expect(promise.raleighwars.longitude).toBe(2);
                expect(promise.raleighwars.modelName).toBe('game');
            });

            it('and have a game without a location', function () {
                delete response.results[0].location;
                promise = gameFactory.queryPoints();
                $httpBackend.flush();

                expect(promise.raleighwars).toBe(undefined);
            });
        });

        it('to update a game.', function () {
            $httpBackend.expectPUT(API_CONFIG.URL + '/game/raleigh-wars').respond();
            gameFactory.update({url: 'raleigh-wars'});
            $httpBackend.flush();
        });
    });

    describe('can check for game status', function () {
        var game, ensureStatusesAreFalse;

        ensureStatusesAreFalse = function (types) {
            angular.forEach(types, function (type) {
                expect(game['is' + type]()).toBe(false);
            });
        };

        beforeEach(function () {
            game = gameFactory.get({id: 1});
        });

        it('of draft', function () {
            var statuses = ['Preregistration', 'Registration', 'PostRegistration', 'Running', 'Archived'];
            game.status = 'DRAFT';

            expect(game.isDraft()).toBe(true);
            ensureStatusesAreFalse(statuses);
        });

        it('of preregistration', function () {
            var statuses = ['Draft', 'Registration', 'PostRegistration', 'Running', 'Archived'];
            game.status = 'PREREGISTRATION';

            ensureStatusesAreFalse(statuses);
        });

        it('of registration', function () {
            var statuses = ['Draft', 'Preregistration', 'PostRegistration', 'Running', 'Archived'];
            game.status = 'REGISTRATION';

            ensureStatusesAreFalse(statuses);
        });

        it('of postRegistration', function () {
            var statuses = ['Draft', 'Preregistration', 'Registration', 'Running', 'Archived'];
            game.status = 'POSTREGISTRATION';

            ensureStatusesAreFalse(statuses);
        });

        it('of running', function () {
            var statuses = ['Draft', 'Preregistration', 'Registration', 'PostRegistration', 'Archived'];
            game.status = 'RUNNING';

            ensureStatusesAreFalse(statuses);
        });

        it('of archived', function () {
            var statuses = ['Draft', 'Preregistration', 'Registration', 'PostRegistration', 'Running'];
            game.status = 'ARCHIVED';

            ensureStatusesAreFalse(statuses);
        });
    });
});


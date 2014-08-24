describe('Factory: game', function () {
    var gameFactory, $httpBackend;

    beforeEach(module('subrosa.game'));

    beforeEach(inject(function ($injector) {
        gameFactory = $injector.get('Game');
    }));
    
    describe("makes a request", function () {
        beforeEach(inject(function ($injector) {
            $httpBackend = $injector.get('$httpBackend');
        }));

        afterEach(function () {
            $httpBackend.flush();
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        it('to get the game from the API.', function () {
            $httpBackend.expectGET('/subrosa/v1/game/raleigh-wars').respond();
            gameFactory.get({url: 'raleigh-wars'});
        });

        it('to query the list of games from the API.', function () {
            $httpBackend.expectGET('/subrosa/v1/game').respond();
            gameFactory.query();
        });

        it('to update a game.', function () {
            $httpBackend.expectPUT('/subrosa/v1/game/raleigh-wars').respond();
            gameFactory.update({url: 'raleigh-wars'});
        });
        
    });

    describe('can check for game status', function () {
        var game,
            ensureStatusesAreFalse = function (types) {
                angular.forEach(types, function (type) {
                    expect(game['is' + type]()).toBe(false);
                });
            };

        beforeEach(function () {
            game = gameFactory.get(1);
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


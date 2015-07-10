describe('Factory: Team', function () {
    'use strict';

    var teamFactory, $httpBackend, API_CONFIG, team;

    beforeEach(module('subrosa.game'));

    beforeEach(function () {
        team = {id: "1234", name: 'mah team', numberOfPlayers: 3};

        inject(function ($injector) {
            $httpBackend = $injector.get('$httpBackend');
            teamFactory = $injector.get('Team');
            API_CONFIG = $injector.get('API_CONFIG');
        });
    });

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('make a request to get the team from the API.', function () {
        $httpBackend.expectGET(API_CONFIG.URL + '/game/raleigh-wars/team/1234').respond(team);
        teamFactory.get({url: 'raleigh-wars', id: 1234}, function (response) {
            expect(response.id).toBe(team.id);
            expect(response.numberOfPlayers).toBe(team.numberOfPlayers);
            expect(response.email).toBe(team.email);
        });
        $httpBackend.flush();
    });
});


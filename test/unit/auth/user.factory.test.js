describe('Factory: User', function () {
    'use strict';

    var $httpBackend, User, API_CONFIG, user;

    beforeEach(module('subrosa.auth'));

    beforeEach(function () {
        user = {id: "1234", username: "yo", email: "yoyo@yo.com"};

        inject(function ($injector) {
            $httpBackend = $injector.get('$httpBackend');
            User = $injector.get('User');
            API_CONFIG = $injector.get('API_CONFIG');
        });
    });

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('make a request to get the user from the API.', function () {
        $httpBackend.expectGET(API_CONFIG.URL + '/user').respond(user);
        User.get(function (response) {
            expect(response.id).toBe(user.id);
            expect(response.username).toBe(user.username);
            expect(response.email).toBe(user.email);
        });
        $httpBackend.flush();
    });
});


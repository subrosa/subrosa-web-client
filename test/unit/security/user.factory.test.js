describe('Factory: User', function () {
    var $httpBackend, User, user;

    beforeEach(module('subrosa.security'));

    beforeEach(function () {
        user = {id: "1234", username: "yo", email: "yoyo@yo.com"};

        inject(function ($injector) {
            $httpBackend = $injector.get('$httpBackend');
            User = $injector.get('User');
        });
    });

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('make a request to get the user from the API.', function () {
        $httpBackend.expectGET('/subrosa/v1/user').respond(user);
        User.get(function (response) {
            expect(response.id).toBe(user.id);
            expect(response.username).toBe(user.username);
            expect(response.email).toBe(user.email);
        });
        $httpBackend.flush();
    });
});


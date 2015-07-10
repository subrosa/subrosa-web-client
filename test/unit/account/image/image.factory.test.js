describe('Factory: Image', function () {
    'use strict';

    var $httpBackend, Image, account;

    beforeEach(module('subrosa.account'));

    beforeEach(function () {
        account = {id: "1234", username: "yo", email: "yoyo@yo.com"};

        inject(function ($injector) {
            $httpBackend = $injector.get('$httpBackend');
            Image = $injector.get('Image');
        });
    });

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('make a request to get the account from the API.', function () {
        $httpBackend.expectGET('/subrosa/v1/user/image/1234').respond(account);
        Image.get({id: 1234}, function (response) {
            expect(response.id).toBe(account.id);
            expect(response.username).toBe(account.username);
            expect(response.email).toBe(account.email);
        });
        $httpBackend.flush();
    });

    it('makes a request to create a new image', function () {
        var newImage = {
            fullImage: '123 Fake St.'
        };
        $httpBackend.expectPOST('/subrosa/v1/user/image').respond(newImage);

        Image.save(newImage, function (response) {
            expect(response.fullImage).toBe(newImage.fullImage);
        });
        $httpBackend.flush();
    });
});


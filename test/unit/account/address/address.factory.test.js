describe('Factory: Address', function () {
    'use strict';

    var $httpBackend, Address, account;

    beforeEach(module('subrosa.account'));

    beforeEach(function () {
        account = {id: "1234", username: "yo", email: "yoyo@yo.com"};

        inject(function ($injector) {
            $httpBackend = $injector.get('$httpBackend');
            Address = $injector.get('Address');
        });
    });

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('make a request to get the account from the API.', function () {
        $httpBackend.expectGET('/subrosa/v1/user/address/1234').respond(account);
        Address.get({id: 1234}, function (response) {
            expect(response.id).toBe(account.id);
            expect(response.username).toBe(account.username);
            expect(response.email).toBe(account.email);
        });
        $httpBackend.flush();
    });

    it('makes a request to create a new address', function () {
        var newAddress = {
            fullAddress: '123 Fake St.'
        };
        $httpBackend.expectPOST('/subrosa/v1/user/address').respond(newAddress);

        Address.save(newAddress, function (response) {
            expect(response.fullAddress).toBe(newAddress.fullAddress);
        });
        $httpBackend.flush();
    });
});


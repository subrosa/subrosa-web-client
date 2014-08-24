describe('Factory: account', function () {
    var $httpBackend, Account, account;

    beforeEach(module('subrosa.account'));

    beforeEach(function () {
        account = {id: "1234", username: "yo", email: "yoyo@yo.com"};

        inject(function ($injector) {
            $httpBackend = $injector.get('$httpBackend');
            Account = $injector.get('Account');
        });
    });

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('make a request to get the account from the API.', function () {
        $httpBackend.expectGET('/subrosa/v1/account/1234').respond(account);
        Account.get({id: 1234}, function (response) {
            expect(response.id).toBe(account.id);
            expect(response.username).toBe(account.username);
            expect(response.email).toBe(account.email);
        });
        $httpBackend.flush();
    });

    it('makes a request to create a new account', function () {
        var newAccount = {
            email: 'new@email.com'
        };
        $httpBackend.expectPOST('/subrosa/v1/account').respond(newAccount);
        Account.account = newAccount;
        Account.password = 'password';
        Account.save(function (response) {
            expect(response.email).toBe(newAccount.email);
        });
        $httpBackend.flush();
    });
});


describe('Filter:accountDisplayName', function () {
    var accountDisplayNameFilter;

    beforeEach(module('subrosa.account'));

    beforeEach(module(function ($provide) {
        $provide.value('i18n',  function (a) {return a; });
    }));

    beforeEach(inject(function ($filter) {
        accountDisplayNameFilter = $filter('accountDisplayName');
    }));

    it("returns a default string when all else fails", function () {
        var expected = "Whomever you are";
        expect(accountDisplayNameFilter({})).toBe(expected);
        expect(accountDisplayNameFilter("lalala")).toBe(expected);
    });

    describe("returns a display name", function () {
        var account;
        beforeEach(function () {
            account = {
                username: 'redworm',
                name: 'bob',
                email: 'bob@redworm.com'
            };
        });

        it("of username if it exists", function () {
            expect(accountDisplayNameFilter(account)).toBe(account.username);
        });

        it("of name if it exists and username does not", function () {
            account.username = null;
            expect(accountDisplayNameFilter(account)).toBe(account.name);
        });

        it("of email if it exists and username and name do not", function () {
            account.username = null;
            account.name = null;
            expect(accountDisplayNameFilter(account)).toBe(account.email);
        });
    });
});

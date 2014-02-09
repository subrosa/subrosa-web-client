describe('Service: ErrorDictionary', function () {
    var gettext, ErrorDictionary;

    beforeEach(module('subrosa.notifications'));

    beforeEach(module(function ($provide) {
        gettext = function (string) { return string; };

        $provide.value('gettext', gettext);
    }));

    beforeEach(inject(function (_ErrorDictionary_) {
        ErrorDictionary = _ErrorDictionary_;
    }));

    describe("provides a transform function", function () {
        it("that transforms the notification if the code is in the dictionary", function () {
            var notification = {code: 1000000001};
            expect(ErrorDictionary.transform(notification)).toBeDefined();
        });

        it("throws an exception if the code is not found in the dictionary", function () {
            var notification = {code: 'lalalala'},
                expected = new Error('Unrecognized error code passed to ErrorDictionary');
            expect(function () {
                ErrorDictionary.transform(notification);
            }).toThrow(expected);
        });
    });

    it("provides an unknown error", function () {
        expect(ErrorDictionary.unknownError).toBeDefined();
    });
});
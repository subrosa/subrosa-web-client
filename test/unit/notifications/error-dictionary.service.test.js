describe('Service: errorDictionary', function () {
    var gettext, errorDictionary;

    beforeEach(module('subrosa.notifications'));

    beforeEach(module(function ($provide) {
        gettext = function (string) { return string; };

        $provide.value('gettext', gettext);
    }));

    beforeEach(inject(function (_errorDictionary_) {
        errorDictionary = _errorDictionary_;
    }));

    describe("provides a transform function", function () {
        it("that adds a translated message if the code is in the dictionary", function () {
            var notification = {code: 'forbidden', severity: "ERROR"},
                result = errorDictionary.translate(notification);
            expect(result.message).toBe('Forbidden');
        });

        it("which defaults to unknown error if the code is not in the dictionary", function () {
            var notification = {code: 'lalalala', severity: "ERROR"},
                result = errorDictionary.translate(notification);
            expect(result.message).toBe(errorDictionary.unknownError);
        });
    });

    it("provides an unknown error", function () {
        expect(errorDictionary.unknownError).toBeDefined();
    });
});

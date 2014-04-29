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
        it("that adds a translated message if the code is in the dictionary", function () {
            var notification = {code: 'forbidden', severity: "ERROR"},
                result = ErrorDictionary.transform(notification);
            expect(result.message).toBe('Forbidden');
        });

        it("which defaults to unknown error if the code is not in the dictionary", function () {
            var notification = {code: 'lalalala', severity: "ERROR"},
                result = ErrorDictionary.transform(notification);
            expect(result.message).toBe(ErrorDictionary.unknownError);
        });

        it("that adds the field to the message if provided", function () {
            var notification = {
                    code: 'invalidValue',
                    severity: "ERROR",
                    details: {
                        field: 'name'
                    }
                },
                result = ErrorDictionary.transform(notification);
            expect(result.message).toBe('Invalid value for field: name');
        });

        it("that adds a translated message to the details field if provided", function () {
            var notification = {
                    code: 'invalidValue',
                    severity: "ERROR",
                    details: {
                        field: 'name',
                        code: 'invalidValue'
                    }
                },
                result = ErrorDictionary.transform(notification);
            expect(result.details.message).toBe('This value is invalid');
        });

        it("which default to unknown field error if the code is not in the dictionary.", function () {
            var notification = {
                    code: 'invalidValue',
                    severity: "ERROR",
                    details: {
                        field: 'name'
                    }
                },
                result = ErrorDictionary.transform(notification);
            expect(result.details.message).toBe('This field is in error');

        });
    });

    it("provides an unknown error", function () {
        expect(ErrorDictionary.unknownError).toBeDefined();
    });
});
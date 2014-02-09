describe('Factory: ErrorInterceptor', function () {
    var $q, ErrorDictionary, ErrorInterceptor, badRequest;

    beforeEach(module('subrosa.notifications'));

    beforeEach(module(function ($provide) {
        $q = {
            reject: function () {}
        };

        ErrorDictionary = {
            transform: function () {},
            unknownError: 'yo'
        };

        $provide.value('$q', $q);
        $provide.value('ErrorDictionary', ErrorDictionary);

        badRequest = {
            status: 400,
            config: {
                url: '/subrosa/v1/targets'
            },
            data: {
                notifications: []
            }
        };
    }));

    beforeEach(inject(function (_ErrorInterceptor_) {
        ErrorInterceptor = _ErrorInterceptor_;
    }));

    it('uses the ErrorDictionary to look up notifications if they exist on the response', function () {
        var notifications = [
            {code: 1234, message: 'lalala'},
            {code: 5678, message: 'yoyoyo'}
        ];
        badRequest.data.notifications = notifications;

        spyOn($q, 'reject');
        spyOn(ErrorDictionary, 'transform').andCallThrough();

        ErrorInterceptor.responseError(badRequest);

        expect(ErrorDictionary.transform.callCount).toBe(2);
        expect(ErrorDictionary.transform).toHaveBeenCalledWith(notifications[0]);
        expect(ErrorDictionary.transform).toHaveBeenCalledWith(notifications[1]);
        expect($q.reject).toHaveBeenCalledWith(badRequest);
    });

    it("adds ErrorDictionary.unknownError to response errors without notifications", function () {
        var expected = badRequest;
        expected.data.notifications = ErrorDictionary.unknownError;
        spyOn($q, 'reject');

        ErrorInterceptor.responseError(badRequest);

        expect($q.reject).toHaveBeenCalledWith(expected);
    });

    it("does not alter 401 responses", function () {
        var unauthorized = {
            status: 401,
            config: {
                url: '/subrosa/v1/targets'
            }
        };
        spyOn($q, 'reject');
        spyOn(ErrorDictionary, 'transform');

        ErrorInterceptor.responseError(unauthorized);

        expect(ErrorDictionary.transform).not.toHaveBeenCalled();
        expect($q.reject).toHaveBeenCalledWith(unauthorized);
    });
});
describe('Service: errorInterceptor', function () {
    var $q, errorDictionary, errorInterceptor, badRequest;

    beforeEach(module('subrosa.notifications'));

    beforeEach(module(function ($provide) {
        $q = {
            reject: function () {}
        };

        errorDictionary = {
            transform: function () {},
            unknownError: 'yo'
        };

        $provide.value('$q', $q);
        $provide.value('errorDictionary', errorDictionary);

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

    beforeEach(inject(function (_errorInterceptor_) {
        errorInterceptor = _errorInterceptor_;
    }));

    it('uses the errorDictionary to look up notifications if they exist on the response', function () {
        var notifications = [
            {code: 1234, message: 'lalala'},
            {code: 5678, message: 'yoyoyo'}
        ];
        badRequest.data.notifications = notifications;

        spyOn($q, 'reject');
        spyOn(errorDictionary, 'transform').andCallThrough();

        errorInterceptor.responseError(badRequest);

        expect(errorDictionary.transform.callCount).toBe(2);
        expect(errorDictionary.transform).toHaveBeenCalledWith(notifications[0]);
        expect(errorDictionary.transform).toHaveBeenCalledWith(notifications[1]);
        expect($q.reject).toHaveBeenCalledWith(badRequest);
    });

    it("adds errorDictionary.unknownError to response errors without notifications", function () {
        var expected = badRequest;
        expected.data.notifications = errorDictionary.unknownError;
        spyOn($q, 'reject');

        errorInterceptor.responseError(badRequest);

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
        spyOn(errorDictionary, 'transform');

        errorInterceptor.responseError(unauthorized);

        expect(errorDictionary.transform).not.toHaveBeenCalled();
        expect($q.reject).toHaveBeenCalledWith(unauthorized);
    });
});

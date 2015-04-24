describe('Service: errorInterceptor', function () {
    var $q, errorDictionary, errorInterceptor, API_CONFIG, badRequest;

    beforeEach(module('subrosa.notifications'));

    beforeEach(module(function ($provide) {
        $q = {
            reject: function () {}
        };

        errorDictionary = {
            translate: function () {},
            unknownError: 'yo'
        };

        $provide.value('$q', $q);
        $provide.value('errorDictionary', errorDictionary);
    }));

    beforeEach(inject(function (_errorInterceptor_, _API_CONFIG_) {
        errorInterceptor = _errorInterceptor_;
        API_CONFIG = _API_CONFIG_;

        badRequest = {
            status: 400,
            config: {
                url: API_CONFIG.URL + '/targets'
            },
            data: {
                notifications: []
            }
        };
    }));

    it('uses the errorDictionary to look up notifications if they exist on the response', function () {
        var notifications = [
            {code: 1234, message: 'lalala'},
            {code: 5678, message: 'yoyoyo'}
        ];
        badRequest.data.notifications = notifications;

        spyOn($q, 'reject');
        spyOn(errorDictionary, 'translate').and.callThrough();

        errorInterceptor.responseError(badRequest);

        expect(errorDictionary.translate.calls.count()).toBe(2);
        expect(errorDictionary.translate).toHaveBeenCalledWith(notifications[0]);
        expect(errorDictionary.translate).toHaveBeenCalledWith(notifications[1]);
        expect($q.reject).toHaveBeenCalledWith(badRequest);
    });

    it("does not alter 401 responses", function () {
        var unauthorized = {
            status: 401,
            config: {
                url: API_CONFIG.URL + '/targets'
            }
        };
        spyOn($q, 'reject');
        spyOn(errorDictionary, 'translate');

        errorInterceptor.responseError(unauthorized);

        expect(errorDictionary.translate).not.toHaveBeenCalled();
        expect($q.reject).toHaveBeenCalledWith(unauthorized);
    });
});

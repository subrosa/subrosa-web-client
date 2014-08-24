describe('Service: session', function () {
    var $window, session, token = 'lalala';

    beforeEach(module('subrosa.security'));

    beforeEach(module(function ($provide) {
        $window = {sessionStorage: {}};

        $provide.value('$window', $window);
    }));

    beforeEach(inject(function (_session_) {
        session = _session_;
    }));

    it('can retrieve the current token from sessionStorage', function () {
        expect(session.getToken()).toBe(undefined);
        $window.sessionStorage.token = token;
        expect(session.getToken()).toBe(token);
    });

    it('can set the sessionStorage token', function () {
        session.setToken(token);
        expect($window.sessionStorage.token).toBe(token);
    });

    it('can remove the current token from sessionStorage', function () {
        $window.sessionStorage.token = token;
        session.removeToken();
        expect($window.sessionStorage.token).toBe(undefined);
    });
});

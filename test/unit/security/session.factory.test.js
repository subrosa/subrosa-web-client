describe('Factory: Session', function () {
    var $window, Session, token = 'lalala';

    beforeEach(module('subrosa.security'));

    beforeEach(module(function ($provide) {
        $window = {sessionStorage: {}};

        $provide.value('$window', $window);
    }));

    beforeEach(inject(function (_Session_) {
        Session = _Session_;
    }));

    it('can retrieve the current token from sessionStorage', function () {
        expect(Session.getToken()).toBe(undefined);
        $window.sessionStorage.token = token;
        expect(Session.getToken()).toBe(token);
    });

    it('can set the sessionStorage token', function () {
        Session.setToken(token);
        expect($window.sessionStorage.token).toBe(token);
    });

    it('can remove the current token from sessionStorage', function () {
        $window.sessionStorage.token = token;
        Session.removeToken();
        expect($window.sessionStorage.token).toBe(undefined);
    });
});
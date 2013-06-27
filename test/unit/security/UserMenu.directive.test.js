'use strict'

describe('UserMenu', function() {
    var $rootScope, scope, userMenu, AuthenticationService;

    // TODO the fact that we need all of the security modules here may point to a problem
    beforeEach(module(
        'subrosa.account',
        'security.directives',
        'security.auth',
        'security.queue',
        'js/security/views/user-menu.html',
        'js/security/views/sign-in-form.html'
    ));

    beforeEach(inject(function(_$rootScope_, $compile, _AuthenticationService_) {
        $rootScope = _$rootScope_;
        AuthenticationService = _AuthenticationService_;
        userMenu = $compile('<div data-user-menu></div>')($rootScope);
        $rootScope.$digest();
        scope = userMenu.scope();
        angular.element(document.body).append(userMenu);
    }));

    afterEach(function() {
        userMenu.remove();
    });

    it('should attach stuff to the scope', inject(function ($compile, $rootScope) {
        expect(scope.currentUser).toBeDefined();
        expect(scope.isAuthenticated).toBe(AuthenticationService.isAuthenticated);
        expect(scope.login).toBe(AuthenticationService.showLogin);
        expect(scope.logout).toBe(AuthenticationService.logout);
    }));

    it('should display an avatar when authenticated', function () {
        AuthenticationService.currentUser = { firstName: 'Jo', lastName: 'Bloggs'};
        $rootScope.$digest();
        var avatar = angular.element(userMenu.find('li'));
        var signInLink = angular.element(userMenu.find('li').next());
        expect(avatar.attr('style')).toBeFalsy();
        expect(signInLink.attr('style')).toMatch('display: none;');
    });

    it('should display sign in button when not authenticated', function () {
        AuthenticationService.currentUser = null;
        $rootScope.$digest();
        var avatar = angular.element(userMenu.find('li'));
        var signInLink = angular.element(userMenu.find('li').next());
        expect(avatar.attr('style')).toMatch('display: none;');
        expect(signInLink.attr('style')).toBeFalsy();
    });

    it('should display default icon for avatar when user does not have an image', function() {
        AuthenticationService.currentUser = { firstName: 'Jo', lastName: 'Bloggs'};
        $rootScope.$digest();
        var avatar = angular.element(userMenu.find('li'));
        expect(avatar.find('img').attr('style')).toMatch('display: none;');
        expect(avatar.find('svg').attr('style')).toBeFalsy();
    });

    it('should display user image for avatar when user does has an image', function() {
        AuthenticationService.currentUser = { firstName: 'Jo', lastName: 'Bloggs', images: {AVATAR: {uri: 'blah.img'}}};
        $rootScope.$digest();
        var avatar = angular.element(userMenu.find('li'));
        var img = avatar.find('img');
        expect(img.attr('style')).toBeFalsy();
        expect(img.attr('src')).toBe(AuthenticationService.currentUser.images.AVATAR.uri);
        expect(avatar.find('svg').attr('style')).toMatch('display: none;');
    });

    it('should call logout when the logout button is clicked', function () {
        spyOn(scope, 'logout');
        AuthenticationService.currentUser = { firstName: 'Jo', lastName: 'Bloggs'};
        $rootScope.$digest();
        var avatar = angular.element(userMenu.find('li'));
        avatar.find('button').triggerHandler('click');
        expect(scope.logout).toHaveBeenCalled();
    });

    it('should call login when the login button is clicked', function () {
        spyOn(scope, 'login');
        AuthenticationService.currentUser = null;
        $rootScope.$digest();
        var avatar = angular.element(userMenu.find('li').next());
        avatar.find('button').triggerHandler('click');
        expect(scope.login).toHaveBeenCalled();
    });
});


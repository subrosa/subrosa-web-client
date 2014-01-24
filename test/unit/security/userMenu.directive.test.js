describe('userMenu', function () {
    var $scope, userMenu, AuthService;

    beforeEach(module(
        'security',
        '/app/security/views/user-menu.html'
    ));

    beforeEach(module(function ($provide) {
        AuthService = {
            currentUser: null,
            isAuthenticated: function () {},
            logout: function () {}
        };
        $provide.value('AuthService', AuthService);
    }));

    beforeEach(inject(function ($rootScope, $compile) {
        $scope = $rootScope;
        userMenu = $compile('<div data-user-menu></div>')($rootScope);
        $scope.$digest();
        $scope.openModal = function () {};
    }));

    it('should attach AuthService functionality to the scope', function () {

        expect($scope.currentUser).toBeDefined();
        expect($scope.isAuthenticated).toBe(AuthService.isAuthenticated);
        expect($scope.logout).toBe(AuthService.logout);
    });

    it('should consist of two li elements containing buttons', function () {
        var listItems = angular.element(userMenu.find('li'));
        expect(listItems.length).toBe(2);
        expect(listItems.find('button').length).toBe(2);
    });

    it('should open a login modal when the login button is clicked', function () {
        var loginButton = userMenu.find("[data-ng-click='openModal()']");
        spyOn($scope, 'openModal');

        loginButton.trigger('click');
        expect($scope.openModal).toHaveBeenCalled();
    });

    it('should call logout when the logout button is clicked', function () {
        var logoutButton = userMenu.find("[data-ng-click='logout()']");
        spyOn($scope, 'logout');

        logoutButton.trigger('click');
        expect($scope.logout).toHaveBeenCalled();
    });

});


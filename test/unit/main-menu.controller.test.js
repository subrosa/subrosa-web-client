describe('Controller: Navigation', function () {
    var $scope, authService, user;

    beforeEach(module('subrosa'));

    beforeEach(inject(function ($controller, $rootScope) {
        user = {id: 1};

        authService = {
            getCurrentUser: function () {
                return {then: function (callback) {
                    callback(user);
                }};
            },
            isAuthenticated: function () {
                return user.authenticated;
            }
        };

        $scope = $rootScope.$new();
        $controller('MainMenuController', {$scope: $scope, authService: authService});
    }));

    it("sets collapsed responsive menu defaults", function () {
        expect($scope.collapsed.left).toBe(true);
        expect($scope.collapsed.right).toBe(true);
    });

    it("gets the current user from the auth service and puts it on the scope", function () {
        spyOn(authService, 'getCurrentUser').andCallThrough();
        user.authenticated = true;

        $scope.$digest();

        expect(authService.getCurrentUser).toHaveBeenCalled();
        expect($scope.user).toBe(user);
    });
});

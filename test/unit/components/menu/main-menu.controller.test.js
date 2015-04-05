describe('Controller: MainMenu', function () {
    var $scope, authService, user;

    beforeEach(module('subrosa.components.menu'));

    beforeEach(inject(function ($controller, $rootScope) {
        user = {id: 1};

        authService = {
            logout: function () {}
        };

        $scope = $rootScope.$new();
        $controller('MainMenuController', {$scope: $scope, authService: authService});
    }));

    it("sets collapsed responsive menu defaults", function () {
        expect($scope.collapsed.main).toBe(true);
        expect($scope.collapsed.account).toBe(true);
    });

    it("sets some authService.logout on the $scope", function () {
        expect($scope.logout).toBe(authService.logout);
    });
});

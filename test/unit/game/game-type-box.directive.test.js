describe('Directive: gameTypeBox', function () {
    var $scope, element;

    beforeEach(module(
        'subrosa.game',
        '/app/game/views/game-type-box.html',
        '/app/game/views/game-box.html',
        '/app/game/views/game-type-icon.html'
    ));

    beforeEach(inject(function ($compile, $rootScope) {
        $scope = $rootScope.$new();
        $scope.gameType = {name: 'Hunger Games', description: 'lalala', icon: 'arrow'};

        element = angular.element('<div game-type-box="gameType"></div>');
        element = $compile(element)($scope);

        $scope.$digest();
    }));

    it("creates a game box", function () {
        expect(element.find('.game-box').length).toBe(1);
    });

    it("populates the game name block with the game type name", function () {
        $scope.$digest();
        expect(element.find('[data-block="game-name"]').text()).toBe($scope.gameType.name);
    });

    it("populates the game description block with the game type description", function () {
        $scope.$digest();
        expect(element.find('[data-block="game-description"]').text()).toContain($scope.gameType.description);
    });
});

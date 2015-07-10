describe('Directive: gameTypeIcon', function () {
    'use strict';

    var element;

    beforeEach(module('subrosa.game', '/app/game/views/game-type-icon.html'));

    beforeEach(inject(function ($compile, $rootScope) {
        var $scope = $rootScope.$new();
        $scope.gameType = {icon: 'arrow'};

        element = angular.element('<div game-type-icon="gameType"></div>');
        element = $compile(element)($scope);

        $scope.$digest();
    }));

    it("creates an icon", function () {
        expect(element.find('i').length).toBe(1);
    });

    it("defaults the icon class to 'fa'", function () {
        expect(element.find('i').hasClass('fa')).toBe(true);
    });

    it("includes the icon class from the game type", function () {
        expect(element.find('i').hasClass('arrow')).toBe(true);
    });
});

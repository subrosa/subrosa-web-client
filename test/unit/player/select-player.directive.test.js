describe('Directive: selectPlayer', function () {
    var $compile, $scope, element, elementScope;

    beforeEach(module(
        'subrosa.player',
        '/app/player/views/select-player.html',
        '/app/player/views/avatar.html',
        '/app/components/form/views/form-feedback.html',
        '/app/components/form/views/input-feedback.html',
        '/app/components/form/views/input-messages.html',
        '/app/player/views/edit-avatar.html'
    ));

    beforeEach(inject(function (_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $scope = _$rootScope_;
    }));

    beforeEach(function () {
        element = angular.element('<div data-select-player="players" data-set-player-callback="doSomething()">');

        $compile(element)($scope);
        $scope.$digest();

        elementScope = element.isolateScope();
    });

    it("displays a way to create a new player", function () {
        expect(element.find('[src="/img/placeholder/new-player.png"]').length).toBe(1);
    });

    it("displays a list of players if they exist", function () {
        $scope.players = ['player'];
        $scope.$digest();
        expect(element.find('[data-avatar="existingPlayer"]').length).toBe(1);
    });

    describe("displays", function () {
        var rows;

        beforeEach(function () {
            rows = element.find('.row');
        });

        it("displays a select player interface if no player is selected", function () {
            expect(rows.first().hasClass('ng-hide')).toBe(false);
            expect(rows.last().hasClass('ng-hide')).toBe(true);
        });

        it("displays an edit player form if a player is selected", function () {
            elementScope.edit = true;
            $scope.$digest();

            expect(rows.first().hasClass('ng-hide')).toBe(true);
            expect(rows.last().hasClass('ng-hide')).toBe(false);
        });
    });

});

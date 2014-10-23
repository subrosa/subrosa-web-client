describe('Directive: collapsedInHeader', function () {
    var $compile, $scope, element, collapsedHeaderMenu, expectedHtml;

    beforeEach(module('subrosa.components.menu'));

    beforeEach(module(function ($provide) {
        collapsedHeaderMenu = {
            setMenu: function () {}
        };
        $provide.value('collapsedHeaderMenu', collapsedHeaderMenu);
    }));

    beforeEach(inject(function (_$compile_, _$rootScope_) {
        expectedHtml = '<li class="hello"></li>';
        element = angular.element('<ul data-collapsed-in-header="lalala">' + expectedHtml + '</ul>');
        $compile = _$compile_;
        $scope = _$rootScope_;
    }));

    it("adds the menu items via collapsed header service", function () {
        var args;
        spyOn(collapsedHeaderMenu, 'setMenu');

        $compile(element)($scope);
        $scope.$digest();
        args = collapsedHeaderMenu.setMenu.calls[0].args;

        expect(collapsedHeaderMenu.setMenu).toHaveBeenCalledWith('lalala', jasmine.any(Object));
        expect(args[1].hasClass('hello')).toBe(true);
    });
});

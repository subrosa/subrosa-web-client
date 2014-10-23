describe('Directive: collapsedHeaderMenu', function () {
    var $compile, $scope, element, elementScope, collapsedHeaderMenu;

    beforeEach(module('subrosa.components.menu'));

    beforeEach(module(function ($provide) {
        collapsedHeaderMenu = {
            getMenu: function () {}
        };
        $provide.value('collapsedHeaderMenu', collapsedHeaderMenu);
    }));

    beforeEach(inject(function (_$compile_, _$rootScope_) {
        element = angular.element('<ul collapsed-header-menu></ul>');
        $compile = _$compile_;
        $scope = _$rootScope_;

        $compile(element)($scope);
        $scope.$digest();

        elementScope = element.scope();
    }));

    it("gets the menu items from the collapsed header service", function () {
        var li;

        spyOn(collapsedHeaderMenu, 'getMenu').andReturn(['<li class="hello"></li>']);

        $scope.$broadcast('menu-items-changed');
        li = element.find('li');

        expect(collapsedHeaderMenu.getMenu).toHaveBeenCalled();
        expect(li.length).toBe(1);
        expect(li.hasClass('hello')).toBe(true);
    });
});

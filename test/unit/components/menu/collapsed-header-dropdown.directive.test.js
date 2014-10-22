describe('Directive: collapsedMenus', function () {
    var $compile, $scope, element, elementScope, collapsedHeaderMenu;

    beforeEach(module('subrosa.components.menu', '/app/components/menu/views/collapsed-header-dropdown.html'));

    beforeEach(module(function ($provide) {
        collapsedHeaderMenu = {
            getMenuItems: function () {},
            getTitle: function () {}
        };
        $provide.value('collapsedHeaderMenu', collapsedHeaderMenu);
    }));

    beforeEach(inject(function (_$compile_, _$rootScope_) {
        element = angular.element('<ul collapsed-header-dropdown></ul>');
        $compile = _$compile_;
        $scope = _$rootScope_;

        $compile(element)($scope);
        $scope.$digest();

        elementScope = element.scope();
    }));

    it("sets the hasMenu boolean for knowing whether or not to display", function () {
        expect(elementScope.hasMenu).toBe(false);
        $scope.$broadcast('menu-items-changed');
        expect(elementScope.hasMenu).toBe(true);
    });

    it("sets the menu title on the scope", function () {
        spyOn(collapsedHeaderMenu, 'getTitle').andReturn('title');
        $scope.$broadcast('menu-items-changed');
        expect(elementScope.title).toBe('title');
    });

    it("appends the items from the collapsed header service", function () {
        spyOn(collapsedHeaderMenu, 'getMenuItems').andReturn(['<li class="hello"></li>']);
        spyOn(collapsedHeaderMenu, 'getTitle').andReturn('title');

        $scope.$broadcast('menu-items-changed');

        expect(collapsedHeaderMenu.getMenuItems).toHaveBeenCalled();
        expect(element.find('.hello').length).toBe(1);
        expect(element.find('.hello').parent().hasClass('dropdown-menu')).toBe(true);
    });
});

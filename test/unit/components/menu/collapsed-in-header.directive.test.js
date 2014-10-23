describe('Directive: collapsedInHeader', function () {
    var $compile, $scope, element, collapsedHeaderMenu, expectedHtml;

    beforeEach(module('subrosa.components.menu'));

    beforeEach(module(function ($provide) {
        collapsedHeaderMenu = {
            setMenu: function () {},
            setMenuIcon: function () {}
        };
        $provide.value('collapsedHeaderMenu', collapsedHeaderMenu);
    }));

    beforeEach(inject(function (_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $scope = _$rootScope_;
        
        expectedHtml = '<li class="hello"></li>';
        element = angular.element('<ul collapsed-in-header header-image="image">' + expectedHtml + '</ul>');
    }));

    it("adds the menu items via collapsed header service", function () {
        var args;
        spyOn(collapsedHeaderMenu, 'setMenu');

        $compile(element)($scope);
        $scope.$digest();
        args = collapsedHeaderMenu.setMenu.calls[0].args;

        expect(collapsedHeaderMenu.setMenu).toHaveBeenCalled();
        expect(args[0].hasClass('hello')).toBe(true);
    });


    it("adds the menu image via collapsed header service", function () {
        spyOn(collapsedHeaderMenu, 'setMenuIcon');
        $scope.image = {name: 'image.png'};

        $compile(element)($scope);
        $scope.$digest();

        expect(collapsedHeaderMenu.setMenuIcon).toHaveBeenCalledWith($scope.image);
    });
});

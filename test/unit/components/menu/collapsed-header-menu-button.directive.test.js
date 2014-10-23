describe('Directive: collapsedHeaderMenuButton', function () {
    var $compile, $scope, element, elementScope, image, collapsedHeaderMenu;

    beforeEach(module('subrosa.components.menu', '/app/components/menu/views/collapsed-header-menu-button.html'));

    beforeEach(module(function ($provide) {
        image = {name: 'image.png'};

        collapsedHeaderMenu = {
            getMenu: function () {
                return [];
            },
            getMenuIcon: function () {
                return image;
            }
        };
        $provide.value('collapsedHeaderMenu', collapsedHeaderMenu);
    }));

    beforeEach(inject(function (_$compile_, _$rootScope_) {
        element = angular.element('<button collapsed-header-menu-button></button>');
        $compile = _$compile_;
        $scope = _$rootScope_;

        $compile(element)($scope);
        $scope.$digest();

        elementScope = element.scope();
    }));

    it("sets the menu icon on the scope", function () {
        expect(elementScope.image).toBe(undefined);
        $scope.$broadcast('menu-items-changed');
        expect(elementScope.image).toBe(image);
    });

    describe("determines whether or not to show the button", function () {

        it("defaults to false", function () {
            expect(elementScope.$parent.showMenu).toBe(false);
        });

        it("sets to true if there are menu items", function () {
            spyOn(collapsedHeaderMenu, 'getMenu').andReturn(['menu']);
            $scope.$broadcast('menu-items-changed');
            expect(elementScope.$parent.showMenu).toBe(true);
        });

        it("sets to false if there are not menu items", function () {
            spyOn(collapsedHeaderMenu, 'getMenu').andReturn([]);
            $scope.$broadcast('menu-items-changed');
            expect(elementScope.$parent.showMenu).toBe(false);
        });

        it("sets to false on $stateChangeSuccess", function () {
            elementScope.$parent.showMenu = true;
            $scope.$broadcast('$stateChangeSuccess');
            expect(elementScope.$parent.showMenu).toBe(false);
        });
    });
});

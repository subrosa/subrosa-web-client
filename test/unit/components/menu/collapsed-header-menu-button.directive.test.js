describe('Directive: collapsedHeaderMenuButton', function () {
    var $compile, $scope, $state, element, elementScope, state, image, collapsedHeaderMenu;

    beforeEach(module('subrosa.components.menu', '/app/components/menu/views/collapsed-header-menu-button.html'));

    beforeEach(module(function ($provide) {
        state = null;
        image = {name: 'image.png'};

        $state = {
            includes: function () {}
        };

        collapsedHeaderMenu = {
            getMenu: function () {
                return [];
            },
            getMenuState: function () {
                return state;
            },
            getMenuIcon: function () {
                return image;
            }
        };

        $provide.value('$state', $state);
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

        it("checks to see if the current state includes the menu state on $stateChangeSuccess", function () {
            spyOn($state, 'includes').andReturn(true);
            $scope.$broadcast('$stateChangeSuccess');
            expect($state.includes).toHaveBeenCalled();
            expect(elementScope.$parent.showMenu).toBe(true);
        });
    });
});

describe('Service: collapsedHeaderMenu', function () {
    var $rootScope, collapsedHeaderMenu;

    beforeEach(module('subrosa.components.menu'));

    beforeEach(inject(function (_$rootScope_, _collapsedHeaderMenu_) {
        $rootScope = _$rootScope_;
        $rootScope.$broadcast = function () {};
        collapsedHeaderMenu = _collapsedHeaderMenu_;
    }));

    it('can retrieve menu items', function () {
        expect(collapsedHeaderMenu.getMenu()).toEqual([]);
    });

    it('can retrieve the menu image', function () {
        expect(collapsedHeaderMenu.getMenuIcon()).toEqual(null);
    });

    it('can add a menu item', function () {
        spyOn($rootScope, '$broadcast');

        collapsedHeaderMenu.setMenu([1, 2]);

        expect(collapsedHeaderMenu.getMenu()).toEqual([1, 2]);
        expect($rootScope.$broadcast).toHaveBeenCalledWith('menu-items-changed');

        collapsedHeaderMenu.setMenu([3, 4]);

        expect(collapsedHeaderMenu.getMenu()).toEqual([3, 4]);
        expect($rootScope.$broadcast).toHaveBeenCalledWith('menu-items-changed');
    });

    it('can add a menu image', function () {
        var image = {name: 'image.png'};
        spyOn($rootScope, '$broadcast');

        collapsedHeaderMenu.setMenuIcon(image);

        expect($rootScope.$broadcast).toHaveBeenCalledWith('menu-items-changed');
    });
});

describe('Service: collapsedHeaderMenu', function () {
    var $rootScope, collapsedHeaderMenu;

    beforeEach(module('subrosa.components.menu'));

    beforeEach(inject(function (_$rootScope_, _collapsedHeaderMenu_) {
        $rootScope = _$rootScope_;
        $rootScope.$broadcast = function () {};
        collapsedHeaderMenu = _collapsedHeaderMenu_;
    }));

    it('can retrieve menu items', function () {
        expect(collapsedHeaderMenu.getMenuItems()).toEqual([]);
    });

    it('can retrieve the menu title', function () {
        expect(collapsedHeaderMenu.getTitle()).toEqual('');
    });

    it('can add a menu item', function () {
        spyOn($rootScope, '$broadcast');

        collapsedHeaderMenu.setMenu('title', [1, 2]);

        expect(collapsedHeaderMenu.getMenuItems()).toEqual([1, 2]);
        expect(collapsedHeaderMenu.getTitle()).toEqual('title');
        expect($rootScope.$broadcast).toHaveBeenCalledWith('menu-items-changed');
    });
});

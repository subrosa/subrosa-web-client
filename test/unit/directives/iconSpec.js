describe('icon', function() {
    // load the module and view.
    beforeEach(module('subrosa.directives'));
    beforeEach(module('views/partials/icon.html'));

    it('should create an svg icon if it exists in the icons object.', inject(function($rootScope, $compile) {
        var svg = $compile('<svg data-icon="skull"></svg>')($rootScope);
        $rootScope.$digest();
        var path = svg.find('path');
        expect(path.attr('d')).toBe(icons.skull);
    }));

    it('should be falsy if icon is not found in the icons object.', inject(function($rootScope, $compile) {
        var svg = $compile('<svg data-icon="lalala"></svg>')($rootScope);
        $rootScope.$digest();
        var path = svg.find('path');
        expect(path.attr('d')).toBeFalsy();
    }));
});

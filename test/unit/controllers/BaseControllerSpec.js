'use strict'

describe('BaseController', function() {
    var rootScope;

    beforeEach(inject(function($controller, $rootScope) {
        rootScope = $rootScope.$new();
        $controller('BaseController', {$scope: rootScope});
    }));

    it('should allow for setting the title of the page.', function() {
        var titleToSet = "Testing: 1, 2, 3.";
        rootScope.setTitle(titleToSet);
        expect(rootScope.title).toEqual(titleToSet);
        rootScope.setTitle();
        expect(rootScope.title).toEqual(undefined);
        rootScope.setTitle(null);
        expect(rootScope.title).toEqual(null);
    });
});
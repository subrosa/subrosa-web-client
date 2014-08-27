describe('Directive: map', function () {
    var $compile, $scope, element;

    beforeEach(module('subrosa.components', 'mocks', '/app/components/map/views/map.html'));

    // Prevent actual dependent leaflet directive from running
    angular.module("subrosa.components").directive("leaflet", function () {
        return {
            priority: 1,
            terminal: true
        };
    });

    beforeEach(module(function ($controllerProvider) {
        $controllerProvider.register('MapDirectiveController', function () {});
    }));

    beforeEach(inject(function (_$compile_, $rootScope) {
        $compile = _$compile_;
        $scope = $rootScope.$new();
    }));

    beforeEach(function () {
        element = angular.element('<div map="mapName"></div>');

        $compile(element)($scope);
        $scope.$digest();
    });

    it("displays a map by passing through to the leaflet directive.", function () {
        expect(element.html()).toContain('data-leaflet');
    });

    it("sets the supplied id on the leaflet map element", function () {
        var id = element.children().first().attr('id');
        expect(id).toBe('mapName');
    });
});

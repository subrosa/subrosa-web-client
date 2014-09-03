describe('Directive: map', function () {
    var $compile, $scope, $q, leaflet, leafletData, i18n, mapElement, element;

    beforeEach(module('subrosa.components.map', 'mocks', '/app/components/map/views/map.html'));

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

    beforeEach(module(function ($provide) {
        leaflet = {
            Icon: {Default: {imagePath: ''}},
            control: {zoom: function () {}}
        };

        mapElement = {
            addLayer: function () {},
            addControl: function () {}
        };

        leafletData = {
            getMap: function () {
                var deferred = $q.defer();
                deferred.resolve(mapElement);
                return deferred.promise;
            }
        };

        i18n = jasmine.createSpy('i18n').andReturn('translated');

        $provide.constant('leaflet', leaflet);
        $provide.value('leafletData', leafletData);
        $provide.value('i18n', i18n);
    }));


    beforeEach(inject(function (_$q_, _$compile_, $rootScope) {
        $q = _$q_;
        $compile = _$compile_;
        $scope = $rootScope.$new();
    }));

    beforeEach(function () {
        element = angular.element('<div map="mapName"></div>');
    });

    describe("display a map", function () {
        beforeEach(function () {
            $compile(element)($scope);
            $scope.$digest();
        });

        it("by passing through to the leaflet directive.", function () {
            expect(element.html()).toContain('data-leaflet');
        });

        it("buy setting the supplied id on the leaflet map element", function () {
            var id = element.children().first().attr('id');
            expect(id).toBe('mapName');
        });
    });

    it("translates the zoom control", function () {
        spyOn(leaflet.control, 'zoom');
        spyOn(mapElement, 'addControl');

        $compile(element)($scope);
        $scope.$digest();

        expect(leaflet.control.zoom).toHaveBeenCalledWith({
            zoomInTitle: 'translated',
            zoomOutTitle: 'translated'
        });
        expect(i18n).toHaveBeenCalled();
    });
});

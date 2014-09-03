/*global $*/
describe('Controller: MapDirectiveController', function () {
    var $controller, $scope, leaflet, dependencies;

    beforeEach(module('subrosa.components.map'));

    beforeEach(function () {
        leaflet = {
            control: {
                locate: function () {}
            },
            'FeatureGroup': function () {
                return {testing: 12};
            }
        };
    });

    beforeEach(inject(function ($q, _$controller_, $rootScope) {
        $controller = _$controller_;
        $scope = $rootScope.$new();
        dependencies = {$scope: $scope, leaflet: leaflet};
    }));

    describe("sets properties on the controller for use in other directives", function () {
        var controller;

        beforeEach(function () {
            $scope.id = 1;
            controller = $controller('MapDirectiveController', dependencies);
        });

        it("mapId", function () {
            expect(controller.mapId).toBe(1);
        });

        it("controls", function () {
            expect($.isEmptyObject(controller.controls)).toBe(true);
        });

        it("shapes", function () {
            expect(controller.shapes.testing).toBe(12);
        });
    });

    describe("sets default values on the $scope", function () {
        beforeEach(function () {
            $controller('MapDirectiveController', dependencies);
        });

        it("sets a default map center on the $scope", function () {
            expect($scope.center.lat).toBe(30);
            expect($scope.center.lng).toBe(-15);
            expect($scope.center.zoom).toBe(3);
        });

        it("sets default map controls on the $scope", function () {
            expect($.isEmptyObject($scope.controls)).toBe(true);
        });

        it("sets default map options on the $scope", function () {
            expect(angular.isObject($scope.options)).toBe(true);
            expect($scope.options.minZoom).toBe(3);
        });
    });

    it("can display a map that allows current location", function () {
        var callback = function () {},
            locationOptions = {
                onLocationError: callback,
                metric: false,
                strings: {
                    title: 'Show me where I am',
                    popup: 'You are within {distance} {unit} from this point',
                    outsideMapsBoundsMsg: 'You seem located outside the boundaries of the map'
                }
            };
        spyOn(leaflet.control, 'locate');

        $scope.onLocationError = callback;
        $scope.allowCurrentLocation = true;
        $controller('MapDirectiveController', dependencies);

        expect(leaflet.control.locate).toHaveBeenCalledWith(locationOptions);
        expect($scope.controls.custom).toBeDefined();
        expect($scope.controls.custom.length).toBe(1);
    });
});

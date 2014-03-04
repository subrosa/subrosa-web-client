/*global $*/
describe('Controller: MapController', function () {
    var $controller, $scope, dependencies;
    beforeEach(module('subrosa.components'));

    beforeEach(inject(function ($q, _$controller_, $rootScope) {
        $controller = _$controller_;
        $scope = $rootScope.$new();

        dependencies = {$scope: $scope};
        $controller('MapController', dependencies);
    }));

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

    it("sets the map draw controls if allowEdit is true", function () {
        var drawControls;
        $scope.allowEdit = true;

        $controller('MapController', dependencies);
        drawControls = $scope.controls.draw;

        expect(drawControls).toBeDefined();
        expect(drawControls.options.draw.circle).toBe(false);
        expect(drawControls.options.draw.marker).toBe(false);
        expect(drawControls.options.draw.polyline).toBe(false);
        expect(drawControls.options.draw.rectangle).toBe(false);
    });

    it("does not set the map draw controls if allowEdit is false", function () {
        $scope.allowEdit = false;
        $controller('MapController', dependencies);
        expect($scope.controls.draw).not.toBeDefined();
    });
});
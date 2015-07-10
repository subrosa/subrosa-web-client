describe('Directive: inputMessages', function () {
    'use strict';

    var $scope, $compile, element, elementScope;

    beforeEach(module('subrosa.components.form', '/app/components/form/views/input-messages.html'));

    beforeEach(inject(function (_$compile_, $rootScope) {
        $compile = _$compile_;
        $scope = $rootScope;
    }));

    beforeEach(function () {
        element = angular.element('<p input-messages="field"></p>');
        $scope.field = {};

        $compile(element)($scope);
        $scope.$digest();

        elementScope = element.isolateScope();
    });

    it("should display a ng-messages element", function () {
        expect(elementScope.field).toBe($scope.field);
        expect(element.attr('data-ng-messages')).toBe('field.$error');
    });

    it("should contain ng-message directives for each type of error", function () {
        expect(element.html()).toContain('ngMessage: required');
        expect(element.html()).toContain('ngMessage: min');
        expect(element.html()).toContain('ngMessage: max');
        expect(element.html()).toContain('ngMessage: number');
        expect(element.html()).toContain('ngMessage: integer');
        expect(element.html()).toContain('ngMessage: email');
        expect(element.html()).toContain('ngMessage: address');
    });
});

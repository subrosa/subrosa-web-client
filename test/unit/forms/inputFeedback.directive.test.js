describe('Directive: inputFeedback', function () {
    var $scope, $compile, element, elementScope;

    beforeEach(module('subrosa.forms', '/app/forms/views/input-feedback.html'));

    beforeEach(inject(function (_$compile_, $rootScope) {
        $compile = _$compile_;
        $scope = $rootScope;
    }));

    beforeEach(function () {
        $scope.field = {};
        var html = '<div data-input-feedback="field">' +
                     '<input type="text"/>' +
                   '</div>';
        element = angular.element(html);

        $compile(element)($scope);
        $scope.$digest();

        elementScope = element.isolateScope();
    });

    it("appends feedback icons to element", function () {
        expect(element.find('.glyphicon-ok').length).toBe(1);
        expect(element.find('.glyphicon-warning-sign').length).toBe(1);
        expect(element.find('.glyphicon-remove').length).toBe(1);
    });

    it("can determine if field should be success", function () {
        var field = {$dirty: false, $valid: false};
        expect(elementScope.hasSuccess(field)).toBe(false);
        field.$dirty = true;
        expect(elementScope.hasSuccess(field)).toBe(false);
        field.$valid = true;
        expect(elementScope.hasSuccess(field)).toBe(true);
    });

    it("can determine if field should be warning", function () {
        var field = {$dirty: false, $invalid: false};
        expect(elementScope.hasWarning(field)).toBe(false);
        field.$dirty = true;
        expect(elementScope.hasWarning(field)).toBe(false);
        field.$invalid = true;
        expect(elementScope.hasWarning(field)).toBe(false);
        elementScope.warn = true;
        expect(elementScope.hasWarning(field)).toBe(true);
    });

    it("can determine if field should be error", function () {
        var field = {$dirty: false, $invalid: false};
        expect(elementScope.hasError(field)).toBe(false);
        field.$dirty = true;
        expect(elementScope.hasError(field)).toBe(false);
        field.$invalid = true;
        expect(elementScope.hasError(field)).toBe(true);
        elementScope.warn = true;
        expect(elementScope.hasError(field)).toBe(false);
    });

    describe("displays input feedback", function () {
        var successIcon, warningIcon, errorIcon;
        beforeEach(function () {
            successIcon = element.find('.glyphicon-ok');
            warningIcon = element.find('.glyphicon-warning-sign');
            errorIcon = element.find('.glyphicon-remove');
        });

        it("for success", function () {
            spyOn(elementScope, 'hasSuccess').andReturn(true);

            $scope.$digest();
            expect(element.hasClass('has-success')).toBe(true);
            expect(successIcon.hasClass('ng-hide')).toBe(false);
            expect(warningIcon.hasClass('ng-hide')).toBe(true);
            expect(errorIcon.hasClass('ng-hide')).toBe(true);
        });

        it("for warning", function () {
            spyOn(elementScope, 'hasWarning').andReturn(true);

            $scope.$digest();

            expect(element.hasClass('has-warning')).toBe(true);
            expect(successIcon.hasClass('ng-hide')).toBe(true);
            expect(warningIcon.hasClass('ng-hide')).toBe(false);
            expect(errorIcon.hasClass('ng-hide')).toBe(true);
        });

        it("for error", function () {
            spyOn(elementScope, 'hasError').andReturn(true);

            $scope.$digest();

            expect(element.hasClass('has-error')).toBe(true);
            expect(successIcon.hasClass('ng-hide')).toBe(true);
            expect(warningIcon.hasClass('ng-hide')).toBe(true);
            expect(errorIcon.hasClass('ng-hide')).toBe(false);
        });
    });

});

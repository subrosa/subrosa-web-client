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
        expect(elementScope.showSuccess(field)).toBe(false);
        field.$dirty = true;
        expect(elementScope.showSuccess(field)).toBe(false);
        field.$valid = true;
        expect(elementScope.showSuccess(field)).toBe(true);
    });

    it("can determine if field should be warning", function () {
        var field = {$dirty: false, $invalid: false};
        expect(elementScope.showWarning(field)).toBe(false);
        field.$dirty = true;
        expect(elementScope.showWarning(field)).toBe(false);
        field.$invalid = true;
        expect(elementScope.showWarning(field)).toBe(false);
        elementScope.warn = true;
        expect(elementScope.showWarning(field)).toBe(true);
    });

    it("can determine if field should be error", function () {
        var field = {$dirty: false, $invalid: false};
        expect(elementScope.showError(field)).toBe(false);
        field.$dirty = true;
        expect(elementScope.showError(field)).toBe(false);
        field.$invalid = true;
        expect(elementScope.showError(field)).toBe(true);
        elementScope.warn = true;
        expect(elementScope.showError(field)).toBe(false);
    });

    describe("displays input feedback", function () {
        var formGroup, successIcon, warningIcon, errorIcon;
        beforeEach(function () {
            formGroup = element.find('.form-group');
            successIcon = formGroup.find('.glyphicon-ok');
            warningIcon = formGroup.find('.glyphicon-warning-sign');
            errorIcon = formGroup.find('.glyphicon-remove');
        });

        it("for success", function () {
            spyOn(elementScope, 'showSuccess').andReturn(true);

            $scope.$digest();

            expect(formGroup.hasClass('has-success')).toBe(true);
            expect(successIcon.hasClass('ng-hide')).toBe(false);
            expect(warningIcon.hasClass('ng-hide')).toBe(true);
            expect(errorIcon.hasClass('ng-hide')).toBe(true);
        });

        it("for warning", function () {
            spyOn(elementScope, 'showWarning').andReturn(true);

            $scope.$digest();

            expect(formGroup.hasClass('has-warning')).toBe(true);
            expect(successIcon.hasClass('ng-hide')).toBe(true);
            expect(warningIcon.hasClass('ng-hide')).toBe(false);
            expect(errorIcon.hasClass('ng-hide')).toBe(true);
        });

        it("for error", function () {
            spyOn(elementScope, 'showError').andReturn(true);

            $scope.$digest();

            expect(formGroup.hasClass('has-error')).toBe(true);
            expect(successIcon.hasClass('ng-hide')).toBe(true);
            expect(warningIcon.hasClass('ng-hide')).toBe(true);
            expect(errorIcon.hasClass('ng-hide')).toBe(false);
        });
    });

});

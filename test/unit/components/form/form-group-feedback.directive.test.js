describe('Directive: formGroupFeedback', function () {
    'use strict';

    var $scope, $compile, formGroup, elementScope;

    beforeEach(module(
        'subrosa.components.form',
        '/app/components/form/views/form-group-feedback.html',
        '/app/components/form/views/input-messages.html'
    ));

    beforeEach(inject(function (_$compile_, $rootScope) {
        $compile = _$compile_;
        $scope = $rootScope;
    }));

    beforeEach(function () {
        var element, html;

        html = '<form><div form-group-feedback="field">' +
                     '<input name="name" type="text"/>' +
                   '</div></form>';

        element = angular.element(html);

        $compile(element)($scope);
        $scope.$digest();

        formGroup = element.find('div');
        elementScope = formGroup.isolateScope();
    });

    it("appends an input-messages element", function () {
        expect(formGroup.find('[data-input-messages="field"]').length).toBe(1);
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
        it("for success", function () {
            spyOn(elementScope, 'hasSuccess').and.returnValue(true);
            $scope.$digest();
            expect(formGroup.hasClass('has-success')).toBe(true);
        });

        it("for warning", function () {
            spyOn(elementScope, 'hasWarning').and.returnValue(true);
            $scope.$digest();
            expect(formGroup.hasClass('has-warning')).toBe(true);
        });

        it("for error", function () {
            spyOn(elementScope, 'hasError').and.returnValue(true);
            $scope.$digest();
            expect(formGroup.hasClass('alert alert-danger')).toBe(true);
        });
    });
});

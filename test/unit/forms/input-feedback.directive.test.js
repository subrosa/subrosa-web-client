describe('Directive: inputFeedback', function () {
    var $scope, $compile, element, elementScope;

    beforeEach(module(
        'subrosa.forms',
        '/app/forms/views/form-feedback.html',
        '/app/forms/views/input-feedback.html'
    ));

    beforeEach(inject(function (_$compile_, $rootScope) {
        $compile = _$compile_;
        $scope = $rootScope;
    }));

    beforeEach(function () {
        $scope.field = {};
        var html = '<div input-feedback="field">' +
                     '<input name="name" type="text"/>' +
                   '</div>';

        element = angular.element(html);

        $compile(element)($scope);
        $scope.$digest();

        elementScope = element.isolateScope();
    });

    it("appends an ng-messages help-block to the element", function () {
        expect(element.find('.help-block').length).toBe(1);
        expect(element.find('[data-ng-messages="field.$error"]').length).toBe(1);
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
            spyOn(elementScope, 'hasSuccess').andReturn(true);

            $scope.$digest();
            expect(element.hasClass('has-success')).toBe(true);
        });

        it("for warning", function () {
            spyOn(elementScope, 'hasWarning').andReturn(true);

            $scope.$digest();

            expect(element.hasClass('has-warning')).toBe(true);
        });

        it("for error", function () {
            spyOn(elementScope, 'hasError').andReturn(true);

            $scope.$digest();

            expect(element.hasClass('has-error')).toBe(true);
        });
    });
});

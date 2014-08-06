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

    it("appends feedback icons to element", function () {
        expect(element.find('.fa-thumbs-o-up').length).toBe(1);
        expect(element.find('.fa-warning').length).toBe(1);
        expect(element.find('.fa-thumbs-o-down').length).toBe(1);
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
            successIcon = element.find('.fa-thumbs-o-up');
            warningIcon = element.find('.fa-warning');
            errorIcon = element.find('.fa-thumbs-o-down');
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

    describe("can use form-feedback's notification object", function () {
        var notifications = [
            {
                severity: "ERROR",
                details: {
                    field: "password",
                    message: "password error"
                }
            },
            {
                severity: "ERROR",
                details: {
                    field: "name",
                    message: "name error"
                }
            }
        ];

        beforeEach(function () {
            var html = '<form form-feedback>' +
                            '<div input-feedback="field">' +
                              '<input name="name" type="text"/>' +
                            '</div>' +
                          '</form>"';

            element = angular.element(html);

            $scope.field = {$name: "name"};
            $scope.notifications = notifications;

            $compile(element)($scope);
            $scope.$digest();

            element = element.find('[input-feedback="field"]');
            elementScope = element.isolateScope();
        });

        it("by setting the notifications on the proper field.", function () {
            expect(elementScope.message).toBe(notifications[1].details.message);
        });

        describe("by displaying notification input feedback", function () {
            var successIcon, warningIcon, errorIcon;
            beforeEach(function () {
                successIcon = element.find('.fa-thumbs-o-up');
                warningIcon = element.find('.fa-warning');
                errorIcon = element.find('.fa-thumbs-o-down');
            });

            it("for success", function () {
                spyOn(elementScope, 'hasSuccess').andReturn(true);

                $scope.notifications[1].severity = 'SUCCESS';
                $scope.$digest();

                expect(element.hasClass('has-success')).toBe(true);
                expect(successIcon.hasClass('ng-hide')).toBe(false);
                expect(warningIcon.hasClass('ng-hide')).toBe(true);
                expect(errorIcon.hasClass('ng-hide')).toBe(true);
            });

            it("for warning", function () {
                spyOn(elementScope, 'hasWarning').andReturn(true);

                $scope.notifications[1].severity = 'WARNING';
                $scope.$digest();

                expect(element.hasClass('has-warning')).toBe(true);
                expect(successIcon.hasClass('ng-hide')).toBe(true);
                expect(warningIcon.hasClass('ng-hide')).toBe(false);
                expect(errorIcon.hasClass('ng-hide')).toBe(true);
            });

            it("for error", function () {
                spyOn(elementScope, 'hasError').andReturn(true);

                $scope.notifications[1].severity = 'ERROR';
                $scope.$digest();

                expect(element.hasClass('has-error')).toBe(true);
                expect(successIcon.hasClass('ng-hide')).toBe(true);
                expect(warningIcon.hasClass('ng-hide')).toBe(true);
                expect(errorIcon.hasClass('ng-hide')).toBe(false);
            });
        });
    });
});

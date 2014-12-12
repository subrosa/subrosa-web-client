describe('Directive: formFeedback', function () {
    var $scope, $compile, element, elementScope;

    beforeEach(module('subrosa.components.form', '/app/components/form/views/form-feedback.html'));

    beforeEach(inject(function (_$compile_, $rootScope) {
        $compile = _$compile_;
        $scope = $rootScope;
    }));

    beforeEach(function () {
        element = angular.element('<form form-feedback="myForm" form-notifications="notifications">' +
            '<input name="myField" type="text"/>' +
            '<input type="radio"/>' +
            '</form>');
        $scope.myForm = {
            myField: {
                $setValidity: function () {},
                $error: {}
            }
        };

        $compile(element)($scope);
        $scope.$digest();

        elementScope = element.isolateScope();
    });

    it("should display the transcluded form", function () {
        expect(element.find('input').length).toBe(2);
        expect(element.find('input[type=text]').length).toBe(1);
        expect(element.find('input[type=radio]').length).toBe(1);
    });

    describe("watches the notifications", function () {
        var notification, constraint;

        beforeEach(function () {
            spyOn(elementScope.form.myField, '$setValidity');
            notification = {details: {field: 'myField', message: 'yo', constraint: 'required'}};
            constraint = notification.details.constraint;
            $scope.notifications = [notification];
        });

        it("and updates the relevant form field if found", function () {
            $scope.$digest();

            expect(elementScope.form.myField.$setValidity).toHaveBeenCalledWith(constraint, false);
            expect(elementScope.form.myField.$error.message).toBe(notification.details.message);
        });

        it("and does nothing if the relevant form field is not found", function () {
            notification.details.field = 'blah';

            $scope.$digest();

            expect(elementScope.form.myField.$setValidity).not.toHaveBeenCalledWith(constraint, false);
            expect(elementScope.form.myField.$error.message).toBe(undefined);
        });

        it("and does nothing if the notification does not contain the details object", function () {
            delete $scope.notifications[0].details;

            $scope.$digest();

            expect(elementScope.form.myField.$setValidity).not.toHaveBeenCalledWith(constraint, false);
            expect(elementScope.form.myField.$error.message).toBe(undefined);
        });

        it("and does nothing if the notification details does not contain the field object", function () {
            delete $scope.notifications[0].details.field;

            $scope.$digest();

            expect(elementScope.form.myField.$setValidity).not.toHaveBeenCalledWith(constraint, false);
            expect(elementScope.form.myField.$error.message).toBe(undefined);
        });
    });
});

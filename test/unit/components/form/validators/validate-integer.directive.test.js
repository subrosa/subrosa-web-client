describe('Directive: validateInteger', function () {
    'use strict';

    var $scope, $compile, element, elementScope;

    beforeEach(module('subrosa.components.form', '/app/components/form/views/form-feedback.html'));

    beforeEach(inject(function (_$compile_, $rootScope) {
        $compile = _$compile_;
        $scope = $rootScope;
    }));

    beforeEach(function () {
        element = angular.element('<form name="myForm" form-feedback="notifications">' +
            '<input type="text" name="integerValue" ng-model="integerValue" validate-integer/>' +
            '</form>');

        $compile(element)($scope);
        $scope.$digest();

        elementScope = element.isolateScope();
    });

    it("Sets an error if the value is not an integer", function () {
        $scope.myForm.integerValue.$setViewValue('1.3');
        expect($scope.myForm.integerValue.$error.integer).toBe(true);
    });

    it("Does not set an error if value is an integer", function () {
        $scope.myForm.integerValue.$setViewValue('1');
        expect($scope.myForm.integerValue.$error.integer).toBe(undefined);
    });
});

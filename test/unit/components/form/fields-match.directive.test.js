describe('Directive: fieldsMatch', function () {
    var $scope, $compile, element, elementScope;

    beforeEach(module('subrosa.components.form'));

    beforeEach(inject(function (_$compile_, $rootScope) {
        $compile = _$compile_;
        $scope = $rootScope;
    }));

    beforeEach(function () {
        var html = '<form name="testForm">' +
                     '<input ng-model="password"/>' +
                     '<input ng-model="passwordConfirm" fields-match="password"/>' +
                   '</form>';

        element = angular.element(html);
        $scope.password = 'bitcheye';

        $compile(element)($scope);
        $scope.$digest();

        elementScope = element.isolateScope();
    });

    it("should set invalid if fields do not match", function () {
        expect($scope.testForm.$valid).toBe(false);
        $scope.passwordConfirm = 'lalala';
        $scope.$digest();
        expect($scope.testForm.$valid).toBe(false);
    });

    it("should set valid if fields match", function () {
        $scope.passwordConfirm = 'bitcheye';
        $scope.$digest();
        expect($scope.testForm.$valid).toBe(true);
    });
});

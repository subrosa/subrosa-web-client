describe('Directive: formFeedback', function () {
    var $scope, $compile, element, elementScope;

    beforeEach(module('subrosa.forms', '/app/forms/views/form-feedback.html'));

    beforeEach(inject(function (_$compile_, $rootScope) {
        $compile = _$compile_;
        $scope = $rootScope;
    }));

    beforeEach(function () {
        element = angular.element('<form form-feedback="notifications">' +
                                    '<input type="text"/>' +
                                    '<input type="radio"/>' +
                                  '</form>');
        $scope.notifications = [];

        $compile(element)($scope);
        $scope.$digest();

        elementScope = element.isolateScope();
    });

    it("should display the transcluded form", function () {
        expect(element.find('input').length).toBe(2);
        expect(element.find('input[type=text]').length).toBe(1);
        expect(element.find('input[type=radio]').length).toBe(1);
    });
});